export interface RegionData {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  searching: number;
  found: number;
  total: number;
  posts: {
    id: string;
    title: string;
    status: 'active' | 'matched' | 'success';
  }[];
  regionType: 'china' | 'seasia';
}

export const sampleRegions: RegionData[] = [
  {
    id: 'shantou',
    name: '汕头',
    nameEn: 'Shantou',
    lat: 23.3541,
    lng: 116.6819,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'chaozhou',
    name: '潮州',
    nameEn: 'Chaozhou',
    lat: 23.6604,
    lng: 116.6436,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'bangkok',
    name: '曼谷',
    nameEn: 'Bangkok',
    lat: 13.7563,
    lng: 100.5018,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'chiangmai',
    name: '清迈',
    nameEn: 'Chiang Mai',
    lat: 18.7877,
    lng: 98.9931,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'singapore',
    name: '新加坡',
    nameEn: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'penang',
    name: '槟城',
    nameEn: 'Penang',
    lat: 5.4149,
    lng: 100.3298,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  }
];

export const regionData: RegionData[] = sampleRegions;

export const getTotalStats = () => {
  const totals = regionData.reduce((acc, region) => ({
    searching: acc.searching + region.searching,
    found: acc.found + region.found,
    total: acc.total + region.total,
  }), { searching: 0, found: 0, total: 0 });
  return totals;
};
