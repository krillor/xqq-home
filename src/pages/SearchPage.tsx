import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, MapPin, Clock, CheckCircle } from 'lucide-react';
import { FamilyMap } from '../components/FamilyMap';
import { regionData as newRegionData } from '../data/regionData';
import LocationSelect from '../components/LocationSelect';
import { allPosts, PostData } from '../data/postData';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [filterRegion, setFilterRegion] = useState<string>(searchParams.get('region') || '');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<{
    countryId?: string;
    provinceId?: string;
    cityId?: string;
    displayName?: string;
  }>();
  
  // Filter posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesLocation = !selectedLocation?.displayName || 
        post.originRegion.includes(selectedLocation.displayName) ||
        post.targetRegion.includes(selectedLocation.displayName);
      
      const matchesStatus = !filterStatus || post.status === filterStatus;
      
      const matchesSearch = !searchQuery || 
        post.title.includes(searchQuery) || 
        post.surname.includes(searchQuery) ||
        post.description.includes(searchQuery);
      
      return matchesLocation && matchesStatus && matchesSearch;
    });
  }, [selectedLocation, filterStatus, searchQuery]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return '已找到';
      default: return '寻找中';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
            寻亲信息
          </h1>
          <p className="text-[#8D6E63]">
            浏览和搜索所有寻亲信息，或使用地图查看分布
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索姓氏、标题或内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <LocationSelect
                  placeholder="筛选地区"
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors"
                >
                  <option value="">所有状态</option>
                  <option value="active">寻找中</option>
                  <option value="success">已找到</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex bg-white rounded-xl shadow-md p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#E67E22] text-white'
                  : 'text-[#5D4037] hover:bg-orange-50'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              地图视图
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#E67E22] text-white'
                  : 'text-[#5D4037] hover:bg-orange-50'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              列表视图
            </button>
          </div>
        </motion.div>
        
        {/* Map View */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <FamilyMap 
              regionId={filterRegion || undefined} 
              height="600px" 
            />
          </motion.div>
        )}
        
        {/* List View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: viewMode === 'list' ? 0.3 : 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#5D4037]">
              {selectedLocation?.displayName 
                ? `${selectedLocation.displayName}的寻亲信息` 
                : '所有寻亲信息'
              }
              <span className="ml-2 text-[#E67E22]">({filteredPosts.length})</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link to={`/detail/${post.id}`} className="block h-full">
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-orange-50 h-full flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl font-bold text-[#E67E22]">
                          {post.surname}氏
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                          {getStatusText(post.status)}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#5D4037] mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{post.originRegion} → {post.targetRegion}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 px-6 py-3 border-t border-orange-100">
                      <span className="text-[#E67E22] font-medium text-sm">
                        查看详情 →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                没有找到相关信息
              </h3>
              <p className="text-gray-400">
                尝试调整筛选条件或搜索其他关键词
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;
