import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, CheckCircle, Clock } from 'lucide-react';
import L from 'leaflet';
import { RegionData, regionData } from '../data/mapData';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker component
const CustomMarker = ({ region }: { region: RegionData }) => {
  const navigate = useNavigate();
  
  // 如果没有数据，不显示标记
  if (region.total === 0 && region.searching === 0 && region.found === 0) {
    return null;
  }
  
  const total = region.total || region.searching + region.found;
  
  // Determine marker color based on total count
  const getColor = (count: number) => {
    if (count >= 20) return '#E67E22'; // Orange for high volume
    if (count >= 10) return '#5D4037'; // Brown for medium
    return '#8D6E63'; // Light brown for low
  };
  
  const color = getColor(total);
  const size = 50;
  const fontSize = 16;
  
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${color};
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: ${fontSize}px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        border: 3px solid white;
      ">
        ${total}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
  
  return (
    <Marker
      position={[region.lat, region.lng]}
      icon={customIcon}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <h3 className="font-bold text-lg text-[#5D4037] mb-2">
            {region.name} / {region.nameEn}
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#E67E22]" />
              <span className="text-sm">寻找中: <strong>{region.searching}</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm">已找到: <strong>{region.found}</strong></span>
            </div>
          </div>
          {region.posts.length > 0 && (
            <div className="border-t border-gray-200 pt-2 mb-2">
              <p className="text-xs text-gray-500 mb-1">最新信息:</p>
              {region.posts.slice(0, 3).map(post => (
                <div key={post.id} className="text-sm py-1">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                    post.status === 'success' ? 'bg-green-500' :
                    post.status === 'matched' ? 'bg-blue-500' : 'bg-orange-500'
                  }`} />
                  {post.title}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => navigate(`/search?region=${region.id}`)}
            className="w-full py-2 bg-[#E67E22] text-white rounded-lg text-sm font-medium hover:bg-[#D35400] transition-colors"
          >
            查看该地区
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

// Map view controller
const MapController = ({ viewMode }: { viewMode: 'world' | 'asia' }) => {
  const map = useMap();
  
  React.useEffect(() => {
    if (viewMode === 'asia') {
      // 东南亚视图 - 放大并定位到东南亚中心
      map.setView([5.0, 105.0], 5, { animate: true });
    } else {
      // 全球视图
      map.setView([20.0, 105.0], 3, { animate: true });
    }
  }, [map, viewMode]);
  
  return null;
};

// Legend component
const MapLegend = () => (
  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg z-[1000]">
    <h4 className="font-semibold text-[#5D4037] mb-2 text-sm">图例</h4>
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#E67E22]" />
        <span className="text-xs">20+ 条信息</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#5D4037]" />
        <span className="text-xs">10-19 条信息</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#8D6E63]" />
        <span className="text-xs">0-9 条信息</span>
      </div>
    </div>
    <div className="mt-3 pt-2 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3 text-[#E67E22]" />
        <span className="text-xs">寻找中</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <CheckCircle className="w-3 h-3 text-green-600" />
        <span className="text-xs">已找到</span>
      </div>
    </div>
  </div>
);

// Stats panel
const MapStats = ({ viewMode }: { viewMode: 'world' | 'asia' }) => {
  const stats = useMemo(() => {
    const filteredRegions = viewMode === 'asia' 
      ? regionData.filter(r => r.regionType === 'seasia')
      : regionData;
    
    return filteredRegions.reduce((acc, region) => ({
      searching: acc.searching + region.searching,
      found: acc.found + region.found,
      total: acc.total + region.total,
    }), { searching: 0, found: 0, total: 0 });
  }, [viewMode]);
  
  return (
    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg z-[1000]">
      <h4 className="font-semibold text-[#5D4037] mb-3">
        {viewMode === 'asia' ? '东南亚统计' : '全球统计'}
      </h4>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-2xl font-bold text-[#E67E22]">{stats.searching}</div>
          <div className="text-xs text-gray-500">寻找中</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">{stats.found}</div>
          <div className="text-xs text-gray-500">已找到</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[#5D4037]">{stats.total}</div>
          <div className="text-xs text-gray-500">总信息</div>
        </div>
      </div>
    </div>
  );
};

interface FamilyMapProps {
  regionId?: string;
  height?: string;
}

export const FamilyMap: React.FC<FamilyMapProps> = ({ 
  regionId, 
  height = '500px' 
}) => {
  const [viewMode, setViewMode] = useState<'world' | 'asia'>('world');
  
  const defaultCenter: [number, number] = [20.0, 105.0];
  
  // 根据视图模式筛选显示的地区
  const visibleRegions = useMemo(() => {
    if (viewMode === 'asia') {
      return regionData.filter(r => r.regionType === 'seasia');
    }
    return regionData; // 全球视图显示所有地区
  }, [viewMode]);
  
  return (
    <div className="relative">
      {/* Map controls */}
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <button
          onClick={() => setViewMode('world')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'world'
              ? 'bg-[#E67E22] text-white'
              : 'bg-white/90 text-[#5D4037] hover:bg-orange-50'
          }`}
        >
          全球视图
        </button>
        <button
          onClick={() => setViewMode('asia')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'asia'
              ? 'bg-[#E67E22] text-white'
              : 'bg-white/90 text-[#5D4037] hover:bg-orange-50'
          }`}
        >
          东南亚视图
        </button>
      </div>
      
      <MapContainer
        key={viewMode} // 强制重新渲染地图以正确应用视图
        center={defaultCenter}
        zoom={viewMode === 'world' ? 3 : 5}
        style={{ height, width: '100%', borderRadius: '16px' }}
      >
        <MapController viewMode={viewMode} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visibleRegions.map(region => (
          <CustomMarker key={region.id} region={region} />
        ))}
        <MapLegend />
        <MapStats viewMode={viewMode} />
      </MapContainer>
    </div>
  );
};
