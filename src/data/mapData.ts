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
  regionType: 'china' | 'seasia'; // 标记地区类型
}

export const regionData: RegionData[] = [
  // 中国大陆地区
  {
    id: 'beijing',
    name: '北京',
    nameEn: 'Beijing',
    lat: 39.9042,
    lng: 116.4074,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'shanghai',
    name: '上海',
    nameEn: 'Shanghai',
    lat: 31.2304,
    lng: 121.4737,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'guangzhou',
    name: '广州',
    nameEn: 'Guangzhou',
    lat: 23.1291,
    lng: 113.2644,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'shenzhen',
    name: '深圳',
    nameEn: 'Shenzhen',
    lat: 22.5431,
    lng: 114.0579,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  // 潮汕地区
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
    id: 'jieyang',
    name: '揭阳',
    nameEn: 'Jieyang',
    lat: 23.5494,
    lng: 116.3668,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'chenghai',
    name: '澄海',
    nameEn: 'Chenghai',
    lat: 23.4675,
    lng: 116.7622,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'fuzhou',
    name: '福州',
    nameEn: 'Fuzhou',
    lat: 26.0745,
    lng: 119.2965,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'xiamen',
    name: '厦门',
    nameEn: 'Xiamen',
    lat: 24.4798,
    lng: 118.0894,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'chengdu',
    name: '成都',
    nameEn: 'Chengdu',
    lat: 30.5728,
    lng: 104.0668,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  
  // 台湾、香港、澳门
  {
    id: 'taipei',
    name: '台北',
    nameEn: 'Taipei',
    lat: 25.0330,
    lng: 121.5654,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'hongkong',
    name: '香港',
    nameEn: 'Hong Kong',
    lat: 22.3193,
    lng: 114.1694,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  {
    id: 'macau',
    name: '澳门',
    nameEn: 'Macau',
    lat: 22.1987,
    lng: 113.5439,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'china'
  },
  
  // 东南亚地区
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
    id: 'phuket',
    name: '普吉岛',
    nameEn: 'Phuket',
    lat: 7.9519,
    lng: 98.3381,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'hatyai',
    name: '合艾',
    nameEn: 'Hat Yai',
    lat: 7.0070,
    lng: 100.4785,
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
    id: 'kualalumpur',
    name: '吉隆坡',
    nameEn: 'Kuala Lumpur',
    lat: 3.1390,
    lng: 101.6869,
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
  },
  {
    id: 'jakarta',
    name: '雅加达',
    nameEn: 'Jakarta',
    lat: -6.2088,
    lng: 106.8456,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'surabaya',
    name: '泗水',
    nameEn: 'Surabaya',
    lat: -7.2575,
    lng: 112.7521,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'medan',
    name: '棉兰',
    nameEn: 'Medan',
    lat: 3.5952,
    lng: 98.6722,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'hanoi',
    name: '河内',
    nameEn: 'Hanoi',
    lat: 21.0285,
    lng: 105.8542,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'hochiminh',
    name: '胡志明市',
    nameEn: 'Ho Chi Minh City',
    lat: 10.8231,
    lng: 106.6297,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  },
  {
    id: 'manila',
    name: '马尼拉',
    nameEn: 'Manila',
    lat: 14.5995,
    lng: 120.9842,
    searching: 0,
    found: 0,
    total: 0,
    posts: [],
    regionType: 'seasia'
  }
];

export const getTotalStats = () => {
  const totals = regionData.reduce((acc, region) => ({
    searching: acc.searching + region.searching,
    found: acc.found + region.found,
    total: acc.total + region.total,
  }), { searching: 0, found: 0, total: 0 });
  return totals;
};
