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
  group?: string;          // 分组标题：中国大陆 / 港澳台 / 东南亚
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
  nameCn: '中国大陆',
  nameEn: 'Mainland China',
  group: '中国大陆',
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
      id: 'cn-tianjin',
      nameCn: '天津市',
      cities: [
        { id: 'cn-tj', nameCn: '天津', nameEn: 'Tianjin' },
      ]
    },
    {
      id: 'cn-chongqing',
      nameCn: '重庆市',
      cities: [
        { id: 'cn-cq', nameCn: '重庆', nameEn: 'Chongqing' },
      ]
    },
    {
      id: 'cn-jiangsu',
      nameCn: '江苏省',
      cities: [
        { id: 'cn-nanjing', nameCn: '南京', nameEn: 'Nanjing' },
        { id: 'cn-suzhou', nameCn: '苏州', nameEn: 'Suzhou' },
        { id: 'cn-wuxi', nameCn: '无锡', nameEn: 'Wuxi' },
      ]
    },
    {
      id: 'cn-shandong',
      nameCn: '山东省',
      cities: [
        { id: 'cn-jinan', nameCn: '济南', nameEn: 'Jinan' },
        { id: 'cn-qingdao', nameCn: '青岛', nameEn: 'Qingdao' },
        { id: 'cn-yantai', nameCn: '烟台', nameEn: 'Yantai' },
      ]
    },
    {
      id: 'cn-henan',
      nameCn: '河南省',
      cities: [
        { id: 'cn-zhengzhou', nameCn: '郑州', nameEn: 'Zhengzhou' },
        { id: 'cn-luoyang', nameCn: '洛阳', nameEn: 'Luoyang' },
      ]
    },
    {
      id: 'cn-hebei',
      nameCn: '河北省',
      cities: [
        { id: 'cn-shijiazhuang', nameCn: '石家庄', nameEn: 'Shijiazhuang' },
        { id: 'cn-tangshan', nameCn: '唐山', nameEn: 'Tangshan' },
      ]
    },
    {
      id: 'cn-hubei',
      nameCn: '湖北省',
      cities: [
        { id: 'cn-wuhan', nameCn: '武汉', nameEn: 'Wuhan' },
        { id: 'cn-yichang', nameCn: '宜昌', nameEn: 'Yichang' },
      ]
    },
    {
      id: 'cn-hunan',
      nameCn: '湖南省',
      cities: [
        { id: 'cn-changsha', nameCn: '长沙', nameEn: 'Changsha' },
        { id: 'cn-yueyang', nameCn: '岳阳', nameEn: 'Yueyang' },
      ]
    },
    {
      id: 'cn-sichuan',
      nameCn: '四川省',
      cities: [
        { id: 'cn-chengdu', nameCn: '成都', nameEn: 'Chengdu' },
        { id: 'cn-mianyang', nameCn: '绵阳', nameEn: 'Mianyang' },
      ]
    },
    {
      id: 'cn-jiangxi',
      nameCn: '江西省',
      cities: [
        { id: 'cn-nanchang', nameCn: '南昌', nameEn: 'Nanchang' },
        { id: 'cn-ganzhou', nameCn: '赣州', nameEn: 'Ganzhou' },
      ]
    },
    {
      id: 'cn-anhui',
      nameCn: '安徽省',
      cities: [
        { id: 'cn-hefei', nameCn: '合肥', nameEn: 'Hefei' },
        { id: 'cn-wuhu', nameCn: '芜湖', nameEn: 'Wuhu' },
      ]
    },
    {
      id: 'cn-liaoning',
      nameCn: '辽宁省',
      cities: [
        { id: 'cn-shenyang', nameCn: '沈阳', nameEn: 'Shenyang' },
        { id: 'cn-dalian', nameCn: '大连', nameEn: 'Dalian' },
      ]
    },
    {
      id: 'cn-jilin',
      nameCn: '吉林省',
      cities: [
        { id: 'cn-changchun', nameCn: '长春', nameEn: 'Changchun' },
        { id: 'cn-jilincity', nameCn: '吉林', nameEn: 'Jilin' },
      ]
    },
    {
      id: 'cn-heilongjiang',
      nameCn: '黑龙江省',
      cities: [
        { id: 'cn-harbin', nameCn: '哈尔滨', nameEn: 'Harbin' },
        { id: 'cn-daqing', nameCn: '大庆', nameEn: 'Daqing' },
      ]
    },
    {
      id: 'cn-shanxi',
      nameCn: '山西省',
      cities: [
        { id: 'cn-taiyuan', nameCn: '太原', nameEn: 'Taiyuan' },
        { id: 'cn-datong', nameCn: '大同', nameEn: 'Datong' },
      ]
    },
    {
      id: 'cn-shaanxi',
      nameCn: '陕西省',
      cities: [
        { id: 'cn-xian', nameCn: '西安', nameEn: "Xi'an" },
        { id: 'cn-baoji', nameCn: '宝鸡', nameEn: 'Baoji' },
      ]
    },
    {
      id: 'cn-yunnan',
      nameCn: '云南省',
      cities: [
        { id: 'cn-kunming', nameCn: '昆明', nameEn: 'Kunming' },
        { id: 'cn-dali', nameCn: '大理', nameEn: 'Dali' },
      ]
    },
    {
      id: 'cn-guizhou',
      nameCn: '贵州省',
      cities: [
        { id: 'cn-guiyang', nameCn: '贵阳', nameEn: 'Guiyang' },
        { id: 'cn-zunyi', nameCn: '遵义', nameEn: 'Zunyi' },
      ]
    },
    {
      id: 'cn-gansu',
      nameCn: '甘肃省',
      cities: [
        { id: 'cn-lanzhou', nameCn: '兰州', nameEn: 'Lanzhou' },
        { id: 'cn-tianshui', nameCn: '天水', nameEn: 'Tianshui' },
      ]
    },
    {
      id: 'cn-qinghai',
      nameCn: '青海省',
      cities: [
        { id: 'cn-xining', nameCn: '西宁', nameEn: 'Xining' },
      ]
    },
    {
      id: 'cn-guangxi',
      nameCn: '广西壮族自治区',
      cities: [
        { id: 'cn-nanning', nameCn: '南宁', nameEn: 'Nanning' },
        { id: 'cn-guilin', nameCn: '桂林', nameEn: 'Guilin' },
      ]
    },
    {
      id: 'cn-neimenggu',
      nameCn: '内蒙古自治区',
      cities: [
        { id: 'cn-huhehaote', nameCn: '呼和浩特', nameEn: 'Hohhot' },
        { id: 'cn-baotou', nameCn: '包头', nameEn: 'Baotou' },
      ]
    },
    {
      id: 'cn-ningxia',
      nameCn: '宁夏回族自治区',
      cities: [
        { id: 'cn-yinchuan', nameCn: '银川', nameEn: 'Yinchuan' },
      ]
    },
    {
      id: 'cn-xinjiang',
      nameCn: '新疆维吾尔自治区',
      cities: [
        { id: 'cn-wulumuqi', nameCn: '乌鲁木齐', nameEn: 'Urumqi' },
        { id: 'cn-kashi', nameCn: '喀什', nameEn: 'Kashgar' },
      ]
    },
    {
      id: 'cn-xizang',
      nameCn: '西藏自治区',
      cities: [
        { id: 'cn-lasa', nameCn: '拉萨', nameEn: 'Lhasa' },
      ]
    },
  ]
};

// 港澳台地区（同属中国，单独分组展示）
const hongKongMacauTaiwan: Country = {
  id: 'china-hmt',
  nameCn: '港澳台',
  nameEn: 'HK · Macau · Taiwan',
  group: '港澳台',
  provinces: [
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
    {
      id: 'cn-taiwan',
      nameCn: '台湾',
      cities: [
        { id: 'tw-tpe', nameCn: '台北', nameEn: 'Taipei' },
        { id: 'tw-khh', nameCn: '高雄', nameEn: 'Kaohsiung' },
        { id: 'tw-tcg', nameCn: '台中', nameEn: 'Taichung' },
        { id: 'tw-tnn', nameCn: '台南', nameEn: 'Tainan' },
      ]
    },
  ]
};

// 东南亚国家统一标记分组
const southeastAsiaGrouped: Country[] = southeastAsia.map(c => ({ ...c, group: '东南亚' }));

// 合并所有地区：中国大陆 + 港澳台 + 东南亚
export const regionData: Country[] = [
  chinaMainland,
  hongKongMacauTaiwan,
  ...southeastAsiaGrouped
];

// 分组顺序（用于选择器渲染分组标题）
export const regionGroups = ['中国大陆', '港澳台', '东南亚'];

// 常用地名别名映射（用于智能解析）
export const placeNameAlias: Record<string, string[]> = {
  // 福建
  'tong an': ['同安', '同安县'],
  'amoy': ['厦门', '厦门厅'],
  'chin chew': ['泉州', '泉州府'],
  'chinchew': ['泉州', '泉州府'],
  'chuan chew': ['泉州', '泉州府'],
  'quanzhou': ['泉州', '泉州府'],
  'changchow': ['漳州', '漳州府'],
  'hokchiu': ['福州', '闽县'],
  'foochow': ['福州', '闽县'],
  'nan an': ['南安', '南安县'],
  'nanan': ['南安', '南安县'],
  'jinjiang': ['晋江', '晋江县'],
  'anxi': ['安溪', '安溪县'],
  'yongchun': ['永春', '永春县'],
  'putian': ['莆田', '兴化府'],
  'hinghua': ['莆田', '兴化府'],
  'zhangpu': ['漳浦', '漳浦县'],
  'longhai': ['龙海'],
  // 广东
  'chao zhou': ['潮州', '潮安县'],
  'teochew': ['潮州', '潮安县'],
  'swatow': ['汕头', '汕头埠'],
  'shantou': ['汕头', '汕头埠'],
  'canton': ['广州', '番禺县'],
  'hakka': ['梅州', '嘉应州'],
  'jiaying': ['梅州', '嘉应州'],
  'chaoan': ['潮安', '潮安县'],
  'jieyang': ['揭阳'],
  'raoping': ['饶平'],
  'hainan': ['海南', '海口', '琼州'],
  // 东南亚
  'penang': ['槟城', '槟榔屿', '乔治市'],
  'pinang': ['槟城', '槟榔屿'],
  'johor': ['柔佛', '新山'],
  'johore': ['柔佛', '新山'],
  'malacca': ['马六甲'],
  'ipoh': ['怡保'],
  'kuala lumpur': ['吉隆坡'],
  'singapore': ['新加坡', '星洲', '星加坡', '狮城'],
  'bangkok': ['曼谷', '吞武里'],
  'siam': ['泰国', '暹罗'],
  'batavia': ['雅加达', '巴达维亚'],
  'saigon': ['胡志明市', '西贡'],
  'siem reap': ['暹粒'],
};
