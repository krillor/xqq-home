// 地区数据：中国大陆、港澳台、东南亚地区
// 结构：国家/地区 -> 省份/州 -> 城市

export interface City {
  id: string;
  nameCn: string;
  nameEn?: string;
  nameLocal?: string;
  alias?: string[];
}

export interface Province {
  id: string;
  nameCn: string;
  nameEn?: string;
  cities: City[];
}

export interface Country {
  id: string;
  nameCn: string;
  nameEn: string;
  provinces: Province[];
}

// 东南亚国家
const southeastAsia: Country[] = [
  {
    id: 'thailand',
    nameCn: '泰国',
    nameEn: 'Thailand',
    provinces: [
      {
        id: 'th-bangkok',
        nameCn: '曼谷',
        cities: [
          { id: 'th-bkk', nameCn: '曼谷', nameEn: 'Bangkok', nameLocal: 'กรุงเทพฯ' },
          { id: 'th-samutprakan', nameCn: '北榄', nameEn: 'Samut Prakan' },
          { id: 'th-nonthaburi', nameCn: '暖武里', nameEn: 'Nonthaburi' },
        ]
      },
      {
        id: 'th-chiangmai',
        nameCn: '清迈府',
        cities: [
          { id: 'th-cnx', nameCn: '清迈', nameEn: 'Chiang Mai', nameLocal: 'เชียงใหม่' },
          { id: 'th-chiangrai', nameCn: '清莱', nameEn: 'Chiang Rai' },
        ]
      },
      {
        id: 'th-phuket',
        nameCn: '普吉府',
        cities: [
          { id: 'th-hkt', nameCn: '普吉岛', nameEn: 'Phuket', nameLocal: 'ภูเก็ต' },
        ]
      },
      {
        id: 'th-songkhla',
        nameCn: '宋卡府',
        cities: [
          { id: 'th-hdy', nameCn: '合艾', nameEn: 'Hat Yai', nameLocal: 'หาดใหญ่' },
          { id: 'th-sgk', nameCn: '宋卡', nameEn: 'Songkhla', nameLocal: 'สงขลา' },
        ]
      },
      {
        id: 'th-chumphon',
        nameCn: '春蓬府',
        cities: [
          { id: 'th-chumphon', nameCn: '春蓬', nameEn: 'Chumphon', nameLocal: 'ชุมพร' },
        ]
      }
    ]
  },
  {
    id: 'singapore',
    nameCn: '新加坡',
    nameEn: 'Singapore',
    provinces: [
      {
        id: 'sg-main',
        nameCn: '新加坡',
        cities: [
          { id: 'sg-sin', nameCn: '新加坡', nameEn: 'Singapore', nameLocal: '新加坡', alias: ['星洲', '星加坡'] },
        ]
      }
    ]
  },
  {
    id: 'malaysia',
    nameCn: '马来西亚',
    nameEn: 'Malaysia',
    provinces: [
      {
        id: 'my-kualalumpur',
        nameCn: '吉隆坡',
        cities: [
          { id: 'my-kl', nameCn: '吉隆坡', nameEn: 'Kuala Lumpur' },
          { id: 'my-petaling', nameCn: '八打灵再也', nameEn: 'Petaling Jaya' },
        ]
      },
      {
        id: 'my-penang',
        nameCn: '槟城',
        cities: [
          { id: 'my-pg', nameCn: '乔治市', nameEn: 'George Town' },
        ]
      },
      {
        id: 'my-selangor',
        nameCn: '雪兰莪',
        cities: [
          { id: 'my-shah', nameCn: '莎阿南', nameEn: 'Shah Alam' },
          { id: 'my-puchong', nameCn: '蒲种', nameEn: 'Puchong' },
        ]
      },
      {
        id: 'my-johor',
        nameCn: '柔佛',
        cities: [
          { id: 'my-jb', nameCn: '新山', nameEn: 'Johor Bahru' },
        ]
      },
    ]
  },
  {
    id: 'indonesia',
    nameCn: '印度尼西亚',
    nameEn: 'Indonesia',
    provinces: [
      {
        id: 'id-jakarta',
        nameCn: '雅加达',
        cities: [
          { id: 'id-jkt', nameCn: '雅加达', nameEn: 'Jakarta' },
        ]
      },
      {
        id: 'id-surabaya',
        nameCn: '东爪哇',
        cities: [
          { id: 'id-sub', nameCn: '泗水', nameEn: 'Surabaya' },
        ]
      },
      {
        id: 'id-medan',
        nameCn: '北苏门答腊',
        cities: [
          { id: 'id-mdn', nameCn: '棉兰', nameEn: 'Medan' },
        ]
      },
    ]
  },
  {
    id: 'vietnam',
    nameCn: '越南',
    nameEn: 'Vietnam',
    provinces: [
      {
        id: 'vn-hcm',
        nameCn: '胡志明市',
        cities: [
          { id: 'vn-sgn', nameCn: '胡志明市', nameEn: 'Ho Chi Minh City', nameLocal: 'Thành phố Hồ Chí Minh', alias: ['西贡', '西堤'] },
        ]
      },
      {
        id: 'vn-hanoi',
        nameCn: '河内',
        cities: [
          { id: 'vn-hn', nameCn: '河内', nameEn: 'Hanoi', nameLocal: 'Hà Nội' },
        ]
      },
    ]
  },
  {
    id: 'philippines',
    nameCn: '菲律宾',
    nameEn: 'Philippines',
    provinces: [
      {
        id: 'ph-manila',
        nameCn: '马尼拉',
        cities: [
          { id: 'ph-mnl', nameCn: '马尼拉', nameEn: 'Manila' },
        ]
      },
    ]
  },
  {
    id: 'myanmar',
    nameCn: '缅甸',
    nameEn: 'Myanmar',
    provinces: [
      {
        id: 'mm-yangon',
        nameCn: '仰光',
        cities: [
          { id: 'mm-rgn', nameCn: '仰光', nameEn: 'Yangon' },
        ]
      },
    ]
  },
  {
    id: 'cambodia',
    nameCn: '柬埔寨',
    nameEn: 'Cambodia',
    provinces: [
      {
        id: 'kh-phnompenh',
        nameCn: '金边',
        cities: [
          { id: 'kh-pnh', nameCn: '金边', nameEn: 'Phnom Penh' },
        ]
      },
    ]
  },
  {
    id: 'laos',
    nameCn: '老挝',
    nameEn: 'Laos',
    provinces: [
      {
        id: 'la-vientiane',
        nameCn: '万象',
        cities: [
          { id: 'la-vte', nameCn: '万象', nameEn: 'Vientiane' },
        ]
      },
    ]
  },
  {
    id: 'brunei',
    nameCn: '文莱',
    nameEn: 'Brunei',
    provinces: [
      {
        id: 'bn-bsb',
        nameCn: '斯里巴加湾',
        cities: [
          { id: 'bn-bwh', nameCn: '斯里巴加湾市', nameEn: 'Bandar Seri Begawan' },
        ]
      },
    ]
  },
];

// 中国大陆省份城市
const chinaMainland: Country = {
  id: 'china',
  nameCn: '中国',
  nameEn: 'China',
  provinces: [
    {
      id: 'cn-guangdong',
      nameCn: '广东省',
      cities: [
        { id: 'cn-gz', nameCn: '广州', nameEn: 'Guangzhou' },
        { id: 'cn-sz', nameCn: '深圳', nameEn: 'Shenzhen' },
        { id: 'cn-chaozhou', nameCn: '潮州', nameEn: 'Chaozhou' },
        { id: 'cn-shantou', nameCn: '汕头', nameEn: 'Shantou' },
        { id: 'cn-jieyang', nameCn: '揭阳', nameEn: 'Jieyang' },
        { id: 'cn-puning', nameCn: '普宁', nameEn: 'Puning' },
        { id: 'cn-chenghai', nameCn: '澄海', nameEn: 'Chenghai' },
        { id: 'cn-chaoan', nameCn: '潮安', nameEn: 'Chaoan' },
        { id: 'cn-raoping', nameCn: '饶平', nameEn: 'Raoping' },
        { id: 'cn-huilai', nameCn: '惠来', nameEn: 'Huilai' },
      ]
    },
    {
      id: 'cn-fujian',
      nameCn: '福建省',
      cities: [
        { id: 'cn-fuzhou', nameCn: '福州', nameEn: 'Fuzhou' },
        { id: 'cn-xiamen', nameCn: '厦门', nameEn: 'Xiamen' },
        { id: 'cn-quanzhou', nameCn: '泉州', nameEn: 'Quanzhou' },
        { id: 'cn-zhangzhou', nameCn: '漳州', nameEn: 'Zhangzhou' },
      ]
    },
    {
      id: 'cn-zhejiang',
      nameCn: '浙江省',
      cities: [
        { id: 'cn-hangzhou', nameCn: '杭州', nameEn: 'Hangzhou' },
        { id: 'cn-wenzhou', nameCn: '温州', nameEn: 'Wenzhou' },
      ]
    },
    {
      id: 'cn-hainan',
      nameCn: '海南省',
      cities: [
        { id: 'cn-haikou', nameCn: '海口', nameEn: 'Haikou' },
        { id: 'cn-sanya', nameCn: '三亚', nameEn: 'Sanya' },
      ]
    },
    {
      id: 'cn-shanghai',
      nameCn: '上海市',
      cities: [
        { id: 'cn-sh', nameCn: '上海', nameEn: 'Shanghai' },
      ]
    },
    {
      id: 'cn-beijing',
      nameCn: '北京市',
      cities: [
        { id: 'cn-bj', nameCn: '北京', nameEn: 'Beijing' },
      ]
    },
    {
      id: 'cn-hongkong',
      nameCn: '香港',
      cities: [
        { id: 'cn-hk', nameCn: '香港', nameEn: 'Hong Kong' },
      ]
    },
    {
      id: 'cn-macao',
      nameCn: '澳门',
      cities: [
        { id: 'cn-mo', nameCn: '澳门', nameEn: 'Macau' },
      ]
    },
  ]
};

// 港澳台地区
const hongKongMacauTaiwan: Country[] = [
  {
    id: 'taiwan',
    nameCn: '台湾',
    nameEn: 'Taiwan',
    provinces: [
      {
        id: 'tw-taipei',
        nameCn: '台北',
        cities: [
          { id: 'tw-tpe', nameCn: '台北', nameEn: 'Taipei' },
        ]
      },
      {
        id: 'tw-kaohsiung',
        nameCn: '高雄',
        cities: [
          { id: 'tw-khh', nameCn: '高雄', nameEn: 'Kaohsiung' },
        ]
      },
    ]
  },
];

// 合并所有地区
export const regionData: Country[] = [
  chinaMainland,
  ...hongKongMacauTaiwan,
  ...southeastAsia
];

// 常用地名别名映射（用于智能解析）
export const placeNameAlias: Record<string, string[]> = {
  'tong an': ['同安', '同安县'],
  'chao zhou': ['潮州', '潮安县'],
  'shantou': ['汕头', '汕头埠'],
  'johor': ['柔佛', '新山'],
  'penang': ['槟城', '槟榔屿', '乔治市'],
  'siem reap': ['暹粒'],
  'bangkok': ['曼谷', '吞武里'],
  'singapore': ['新加坡', '星洲', '星加坡', '狮城'],
};
