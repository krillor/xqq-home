import React, { useState } from 'react'
import { MapPin, Phone, Mail, Globe, Search, Building2, ExternalLink, Info, Facebook, BookOpen, Users, Heart } from 'lucide-react'

// ─── 类型定义 ──────────────────────────────────────────────────────────────────

type Category = 'chamber' | 'clan' | 'archive' | 'china'

interface SocialMedia {
  platform: 'facebook' | 'twitter' | 'line' | 'instagram' | 'linkedin'
  label: string
  url: string
}

interface Association {
  id: string
  category: Category
  name: string
  country: string
  countryFlag: string
  city: string
  address?: string
  phone?: string
  email?: string
  description: string
  website?: string
  social?: SocialMedia[]
  surnames?: string[]
  tags?: string[]
}

// ─── 数据 ──────────────────────────────────────────────────────────────────────

const associations: Association[] = [

  // ── 商会 / 侨联 ──────────────────────────────────────────────────────────────

  {
    id: 'sg-sccci',
    category: 'chamber',
    name: '新加坡中华总商会 (SCCCI)',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '47 Hill Street, #09-00 SCCCI Building, Singapore 179365',
    phone: '+65 6337 8381',
    email: 'enquiry@sccci.org.sg',
    description: '成立于1906年，新加坡最具影响力的华商组织，历史档案丰富',
    website: 'https://www.sccci.org.sg',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/SCCCI1906' },
    ]
  },
  {
    id: 'sg-sfcca',
    category: 'chamber',
    name: '新加坡宗乡会馆联合总会 (SFCCA)',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '397 Lorong 2 Toa Payoh, Singapore 319639',
    phone: '+65 6354 4078',
    email: 'admin@sfcca.sg',
    description: '代表超过200个宗乡会馆的最高华人社团机构，寻根资源极为丰富',
    website: 'https://www.sfcca.sg',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/sfcca.sg' },
    ]
  },
  {
    id: 'my-acccim',
    category: 'chamber',
    name: '马来西亚中华总商会 (ACCCIM)',
    country: '马来西亚',
    countryFlag: '🇲🇾',
    city: '吉隆坡',
    address: '6th Floor, Wisma Chinese Chamber, 258 Jalan Ampang, 50450 Kuala Lumpur',
    phone: '+60 3-4260 3090',
    email: 'admin@acccim.org.my',
    description: '成立于1921年，全马华商核心代表机构，覆盖13个州',
    website: 'https://www.acccim.org.my',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/ACCCIM' },
    ]
  },
  {
    id: 'my-huazong',
    category: 'chamber',
    name: '马来西亚华人大会堂总会 (华总)',
    country: '马来西亚',
    countryFlag: '🇲🇾',
    city: '吉隆坡',
    address: '1 Jalan Maharajalela, 50150 Kuala Lumpur',
    phone: '+60 3-2272 3383',
    email: 'info@huazong.my',
    description: '全马华人社团最高领导机构，侧重文化传承与侨务工作',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/Huazong.MY' },
    ]
  },
  {
    id: 'my-penang',
    category: 'chamber',
    name: '槟城中华总商会 (PCCCI)',
    country: '马来西亚',
    countryFlag: '🇲🇾',
    city: '槟城',
    address: '95 Jalan Penang, 10000 George Town, Penang',
    phone: '+60 4-261 5015',
    email: 'pcccipenang@gmail.com',
    description: '槟城华商核心机构，对潮汕、闽南籍华侨的历史档案保存尤为完整',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/pcccipenang' },
    ]
  },
  {
    id: 'th-tcc',
    category: 'chamber',
    name: '泰国中华总商会 (TCC)',
    country: '泰国',
    countryFlag: '🇹🇭',
    city: '曼谷',
    address: '150 Rajawongse Road, Samphanthawong, Bangkok 10100',
    phone: '+66 2 224 0056',
    email: 'info@thaicc.org',
    description: '泰国最具影响力的华人商会，在政商界地位举足轻重',
    website: 'https://www.thaicc.org',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/thaicc.org' },
    ]
  },
  {
    id: 'th-chaozhou',
    category: 'chamber',
    name: '泰国潮州会馆',
    country: '泰国',
    countryFlag: '🇹🇭',
    city: '曼谷',
    address: '531 Yaowarat Road, Samphanthawong, Bangkok 10100',
    phone: '+66 2 222 3977',
    description: '泰国最大的华人地缘社团，潮汕籍华侨核心机构，宗亲档案极丰富',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/thaiteochew' },
    ]
  },
  {
    id: 'id-permit',
    category: 'chamber',
    name: '印尼中华总商会 (PERMIT)',
    country: '印度尼西亚',
    countryFlag: '🇮🇩',
    city: '雅加达',
    address: 'Jl. Hayam Wuruk No.127, Taman Sari, Jakarta Barat 11170',
    phone: '+62 21 626 7890',
    email: 'secretariat@permit.or.id',
    description: '印尼华商核心组织，致力于促进中印尼经贸与文化交流',
    website: 'https://www.permit.or.id',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/permitIndonesia' },
    ]
  },
  {
    id: 'id-inti',
    category: 'chamber',
    name: '印尼华裔总会 (INTI)',
    country: '印度尼西亚',
    countryFlag: '🇮🇩',
    city: '雅加达',
    address: 'Jl. Gajah Mada No.88, Taman Sari, Jakarta Barat',
    phone: '+62 21 639 1988',
    description: '印尼主要华人社团，关注华裔权益保护与文化传承',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/DPP.INTI' },
    ]
  },
  {
    id: 'ph-ffcccii',
    category: 'chamber',
    name: '菲律宾菲华商联总会 (FFCCCII)',
    country: '菲律宾',
    countryFlag: '🇵🇭',
    city: '马尼拉',
    address: '2nd Floor, Federation Center Bldg., Muelle de Binondo St., Binondo, Manila',
    phone: '+63 2 241-9201',
    email: 'ffcccii@gmail.com',
    description: '成立于1954年，菲律宾华社"龙头"组织，简称"商总"',
    website: 'https://www.ffcccii.org',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/ffcccii' },
    ]
  },
  {
    id: 'vn-cbcc',
    category: 'chamber',
    name: '中国商会越南分会 (CBCC)',
    country: '越南',
    countryFlag: '🇻🇳',
    city: '河内',
    address: '49-51 Hai Ba Trung Street, Hoan Kiem District, Hanoi',
    phone: '+84 24 3825 3999',
    email: 'contact@cbccvn.org',
    description: '由在越中资企业及常驻代表机构组成的非营利性社团组织',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/CBCCVietnam' },
    ]
  },
  {
    id: 'kh-ccc',
    category: 'chamber',
    name: '柬埔寨中华总商会',
    country: '柬埔寨',
    countryFlag: '🇰🇭',
    city: '金边',
    address: 'No. 28, St. 110, Phnom Penh',
    phone: '+855 23 217 983',
    description: '柬埔寨华商的核心组织，对闽南、潮汕籍华侨有相关档案资料',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/cambodiachinesechamber' },
    ]
  },
  {
    id: 'la-ccc',
    category: 'chamber',
    name: '老挝中国商会',
    country: '老挝',
    countryFlag: '🇱🇦',
    city: '万象',
    address: 'Unit 9, Km3, Thadeua Road, Vientiane',
    phone: '+856 21 315 166',
    email: 'ccclaos@gmail.com',
    description: '老挝华人华商联合组织，服务在老华人社区',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/ccclaos' },
    ]
  },
  {
    id: 'bn-scba',
    category: 'chamber',
    name: '文莱中华商会 (SCBA)',
    country: '文莱',
    countryFlag: '🇧🇳',
    city: '斯里巴加湾',
    address: 'No. 72, Jalan Tutong, Bandar Seri Begawan BS8211, Brunei',
    phone: '+673 222 3718',
    email: 'scba@brunet.bn',
    description: '文莱华商联合会，华人社区历史档案的重要保存机构',
  },
  {
    id: 'hk-chaochow',
    category: 'chamber',
    name: '香港潮州商会',
    country: '香港',
    countryFlag: '🇭🇰',
    city: '香港',
    address: '香港九龙旺角弼街59-63号恒丰商业中心6楼',
    phone: '+852 2396 3631',
    email: 'info@chiu-chow.org.hk',
    description: '港澳地区潮汕籍华侨最重要的联络机构，拥有大量海外潮人族谱资料',
    website: 'https://www.chiu-chow.org.hk',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/chiuchowcc' },
    ]
  },
  {
    id: 'hk-fukien',
    category: 'chamber',
    name: '香港福建商会',
    country: '香港',
    countryFlag: '🇭🇰',
    city: '香港',
    address: '香港上环永乐街193-209号福建大厦4-5楼',
    phone: '+852 2543 3808',
    email: 'info@hkfba.com.hk',
    description: '闽籍华侨在港重要联络机构，保存有大量闽南族谱与海外移民资料',
    website: 'https://www.hkfba.com.hk',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/hkfba' },
    ]
  },
  {
    id: 'mm-ccc',
    category: 'chamber',
    name: '缅甸华商会',
    country: '缅甸',
    countryFlag: '🇲🇲',
    city: '仰光',
    address: 'No.118, Shwebontha Street, Kyauktada Township, Yangon',
    phone: '+95 1 252 880',
    description: '缅甸华人商业团体代表组织，与闽南、潮汕籍华侨社区关系密切',
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/myanmarchinesechamber' },
    ]
  },

  // ── 宗亲会 ───────────────────────────────────────────────────────────────────

  {
    id: 'clan-chen-sg',
    category: 'clan',
    name: '新加坡颍川陈氏公会',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '4 Lor 1 Toa Payoh, Singapore 319746',
    phone: '+65 6253 5122',
    description: '新加坡最大陈氏宗亲组织，保存有东南亚陈氏族谱及各支系迁徙记录',
    website: 'https://www.yingchuan.org.sg',
    surnames: ['陈', 'Tan', 'Chan', 'Chen'],
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/yingchuansg' },
    ]
  },
  {
    id: 'clan-lin-sg',
    category: 'clan',
    name: '新加坡西河林氏公会',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '4 Lor 1 Toa Payoh, #02-01, Singapore 319746',
    phone: '+65 6253 0729',
    description: '新加坡林氏宗亲总机构，收录东南亚林氏各支谱牒与迁徙资料',
    surnames: ['林', 'Lim', 'Lam', 'Lin'],
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/xihelinsg' },
    ]
  },
  {
    id: 'clan-huang-sg',
    category: 'clan',
    name: '新加坡江夏黄氏总会',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '180 Bencoolen Street, #09-03, Singapore 189648',
    phone: '+65 6337 3230',
    description: '东南亚黄氏宗亲联络机构，保有江夏黄氏历代族谱',
    surnames: ['黄', 'Ng', 'Wong', 'Huang'],
  },
  {
    id: 'clan-wang-sg',
    category: 'clan',
    name: '新加坡太原王氏公会',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '4 Lor 1 Toa Payoh, Singapore 319746',
    phone: '+65 6256 0882',
    description: '新加坡王氏宗亲核心机构，收录太原王氏东南亚各支系资料',
    surnames: ['王', 'Ong', 'Wong', 'Wang'],
  },
  {
    id: 'clan-li-my',
    category: 'clan',
    name: '马来西亚陇西李氏宗祠',
    country: '马来西亚',
    countryFlag: '🇲🇾',
    city: '吉隆坡',
    address: 'Jalan Sultan, 50000 Kuala Lumpur',
    phone: '+60 3-2078 1388',
    description: '全马李氏宗亲总机构，保有马来西亚各州李氏族谱及源流记载',
    surnames: ['李', 'Lee', 'Li'],
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/liassociationmy' },
    ]
  },
  {
    id: 'clan-zhang-my',
    category: 'clan',
    name: '马来西亚清河张氏宗祠',
    country: '马来西亚',
    countryFlag: '🇲🇾',
    city: '吉隆坡',
    address: 'Jalan Pudu, 55100 Kuala Lumpur',
    phone: '+60 3-2148 5588',
    description: '马来西亚张氏宗亲联合机构，收录闽南、潮汕、客家各支系张氏族谱',
    surnames: ['张', 'Teo', 'Cheong', 'Zhang'],
  },
  {
    id: 'clan-chen-th',
    category: 'clan',
    name: '泰国陈氏宗亲总会',
    country: '泰国',
    countryFlag: '🇹🇭',
    city: '曼谷',
    address: 'Yaowarat Road, Samphanthawong, Bangkok',
    phone: '+66 2 222 9111',
    description: '泰国规模最大的陈氏宗亲机构，保存泰国各地陈氏家族渊源资料',
    surnames: ['陈', 'Tan', 'Chan'],
    social: [
      { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/chenthaiclan' },
    ]
  },
  {
    id: 'clan-cai-sg',
    category: 'clan',
    name: '新加坡济阳柯蔡公会',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '18 Toa Payoh Lor 4, Singapore 319819',
    phone: '+65 6253 0111',
    description: '新加坡蔡、柯两姓宗亲联合机构，保有济阳堂系东南亚支系资料',
    surnames: ['蔡', '柯', 'Chua', 'Cai', 'Koh'],
  },
  {
    id: 'clan-guo-sg',
    category: 'clan',
    name: '新加坡郭氏公会',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    address: '4 Lor 1 Toa Payoh, Singapore 319746',
    phone: '+65 6256 3920',
    description: '新加坡郭氏宗亲组织，主要涵盖闽南、潮汕籍郭姓华侨后代',
    surnames: ['郭', 'Quek', 'Kwok'],
  },

  // ── 档案 / 族谱资源 ──────────────────────────────────────────────────────────

  {
    id: 'archive-gd',
    category: 'archive',
    name: '广东省档案馆华侨档案查询',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '广州',
    address: '广州市越秀区中山四路124号',
    phone: '+86 20-8380 2837',
    email: 'gdag@gd.gov.cn',
    description: '收录大量广东籍华侨下南洋的移民档案、侨批原件及族谱资料，可申请查阅',
    website: 'https://www.gdag.gov.cn',
    tags: ['广东', '潮汕', '珠三角', '客家'],
  },
  {
    id: 'archive-fj',
    category: 'archive',
    name: '福建省图书馆闽台族谱中心',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '福州',
    address: '福州市鼓楼区湖东路162号',
    phone: '+86 591-8377 5363',
    description: '中国最大的闽台族谱收藏机构之一，馆藏族谱逾两万册，提供查询服务',
    website: 'https://www.fjlib.net',
    tags: ['福建', '闽南', '泉州', '漳州', '福州'],
  },
  {
    id: 'archive-qz',
    category: 'archive',
    name: '泉州华侨历史博物馆',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '泉州',
    address: '福建省泉州市丰泽区泉秀街道泉秀路华侨大厦',
    phone: '+86 595-2281 1997',
    description: '专注闽南籍华侨历史，馆藏侨批、族谱、移民证件等原始文献，可协助寻根',
    tags: ['泉州', '闽南', '南洋', '侨批'],
  },
  {
    id: 'archive-sw',
    category: 'archive',
    name: '汕头侨批文物馆',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '汕头',
    address: '广东省汕头市金平区外马路22号',
    phone: '+86 754-8831 6677',
    description: '世界文化遗产"侨批"的核心收藏地，馆藏数万件潮汕华侨往来信件与汇款凭证',
    website: 'https://www.stqb.com.cn',
    tags: ['潮汕', '侨批', '汕头', '下南洋'],
  },
  {
    id: 'archive-online-roots',
    category: 'archive',
    name: '世界华人寻根网',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '在线',
    description: '可在线搜索中国各地族谱数据库，支持按姓氏、省份检索，覆盖数千个姓氏',
    website: 'https://www.chineseroots.com',
    tags: ['在线', '族谱', '姓氏', '全国'],
  },
  {
    id: 'archive-familysearch',
    category: 'archive',
    name: 'FamilySearch 中国族谱数据库',
    country: '国际',
    countryFlag: '🌐',
    city: '在线',
    description: '全球最大免费族谱数据库，收录中国大量家谱记录，支持中文姓名检索',
    website: 'https://www.familysearch.org',
    tags: ['在线', '免费', '国际', '族谱'],
  },

  // ── 中国国内对口机构 ──────────────────────────────────────────────────────────

  {
    id: 'china-ql',
    category: 'china',
    name: '中国归国华侨联合会（中国侨联）',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '北京',
    address: '北京市西城区阜外大街35号',
    phone: '+86 10-6839 4800',
    description: '中国最高侨务组织，拥有最完整的海外华侨华人档案及联络网络，可提供官方寻亲协助',
    website: 'https://www.chinaql.org',
  },
  {
    id: 'china-gd-qb',
    category: 'china',
    name: '广东省侨务办公室',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '广州',
    address: '广州市越秀区东风中路305号省府大院综合楼',
    phone: '+86 20-8363 0195',
    email: 'gdqb@gd.gov.cn',
    description: '广东省政府涉侨机构，可协助查询广东籍海外华侨资料，对接东南亚华社',
    website: 'https://www.gdoverseaschinese.gov.cn',
  },
  {
    id: 'china-fj-qb',
    category: 'china',
    name: '福建省侨务办公室',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '福州',
    address: '福州市鼓楼区华林路76号',
    phone: '+86 591-8779 5727',
    email: 'fjqb@fujian.gov.cn',
    description: '福建省政府涉侨机构，可协助闽籍华侨寻根问祖及族谱查阅',
    website: 'https://www.fjoverseaschinese.gov.cn',
  },
  {
    id: 'china-mofcom',
    category: 'china',
    name: '中国贸促会海外代表处',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '北京',
    address: '北京市西城区月坛北街2号',
    phone: '+86 10-8807 5678',
    description: '在东南亚各主要城市设有代表处，可协助联系当地华商组织，是对接侨领的官方渠道',
    website: 'https://www.ccpit.org',
  },
  {
    id: 'china-shantou-qb',
    category: 'china',
    name: '汕头市侨务局',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '汕头',
    address: '广东省汕头市金平区长平路华侨大厦',
    phone: '+86 754-8832 1234',
    description: '汕头市政府涉侨机构，专项服务潮汕籍海外华侨寻根，与泰国、马来西亚潮人社团联系紧密',
  },
  {
    id: 'china-quanzhou-qb',
    category: 'china',
    name: '泉州市侨务办公室',
    country: '中国',
    countryFlag: '🇨🇳',
    city: '泉州',
    address: '福建省泉州市鲤城区庄府巷1号',
    phone: '+86 595-2228 5678',
    description: '泉州市政府涉侨机构，对接东南亚闽南籍华侨，可协助查阅闽南族谱资料',
  },
]

// ─── 工具函数 ──────────────────────────────────────────────────────────────────

const platformIcon = (platform: string) => {
  if (platform === 'facebook')  return <Facebook className="w-3.5 h-3.5" />
  if (platform === 'twitter')   return <span className="font-bold text-[11px] leading-none">𝕏</span>
  if (platform === 'instagram') return <span className="text-[11px] leading-none">📷</span>
  if (platform === 'linkedin')  return <span className="font-bold text-[10px] leading-none">in</span>
  if (platform === 'line')      return <span className="font-bold text-[10px] leading-none">LINE</span>
  return <Globe className="w-3.5 h-3.5" />
}

const platformStyle = (platform: string) => {
  if (platform === 'facebook')  return 'bg-blue-50 text-blue-600 hover:bg-blue-100'
  if (platform === 'twitter')   return 'bg-gray-900 text-white hover:bg-black'
  if (platform === 'instagram') return 'bg-pink-50 text-pink-600 hover:bg-pink-100'
  if (platform === 'linkedin')  return 'bg-blue-700 text-white hover:bg-blue-800'
  if (platform === 'line')      return 'bg-green-500 text-white hover:bg-green-600'
  return 'bg-gray-50 text-gray-600 hover:bg-gray-100'
}

// ─── 分类配置 ──────────────────────────────────────────────────────────────────

const CATEGORIES: { key: Category; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'chamber', label: '商会 / 侨联', icon: <Building2 className="w-5 h-5" />, desc: '东南亚各国华商总会与华人侨联' },
  { key: 'clan',    label: '宗亲会',     icon: <Users className="w-5 h-5" />,    desc: '按姓氏分类的宗亲联合组织' },
  { key: 'archive', label: '族谱 / 档案', icon: <BookOpen className="w-5 h-5" />, desc: '族谱收藏机构与在线查询资源' },
  { key: 'china',   label: '国内对口机构', icon: <Heart className="w-5 h-5" />,   desc: '中国大陆官方侨务机构' },
]

// ─── 卡片组件 ──────────────────────────────────────────────────────────────────

const AssocCard: React.FC<{ assoc: Association }> = ({ assoc }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 flex flex-col">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 rounded-t-2xl flex items-center gap-2">
        <span className="text-lg leading-none">{assoc.countryFlag}</span>
        <span className="text-white text-sm font-medium">{assoc.country}</span>
        {assoc.city && assoc.city !== assoc.country && (
          <span className="text-amber-100 text-xs ml-auto flex items-center gap-1">
            <MapPin className="w-3 h-3" />{assoc.city}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="text-sm font-bold text-gray-800 leading-snug mb-1.5">{assoc.name}</h3>
          {assoc.surnames && (
            <div className="flex flex-wrap gap-1">
              {assoc.surnames.map(s => (
                <span key={s} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200">{s}</span>
              ))}
            </div>
          )}
          {assoc.tags && (
            <div className="flex flex-wrap gap-1 mt-1">
              {assoc.tags.map(t => (
                <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">{t}</span>
              ))}
            </div>
          )}
        </div>

        <p className="text-gray-500 text-xs leading-relaxed">{assoc.description}</p>

        <div className="space-y-2 text-xs">
          {assoc.address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{assoc.address}</span>
            </div>
          )}
          {assoc.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <a href={`tel:${assoc.phone}`} className="text-gray-600 hover:text-amber-600 transition-colors">{assoc.phone}</a>
            </div>
          )}
          {assoc.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <a href={`mailto:${assoc.email}`} className="text-amber-600 hover:text-amber-700 transition-colors truncate">{assoc.email}</a>
            </div>
          )}
          {assoc.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <a href={assoc.website} target="_blank" rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors">
                官方网站 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {assoc.social && assoc.social.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 mt-auto">
            {assoc.social.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${platformStyle(s.platform)}`}>
                {platformIcon(s.platform)}{s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── 主页面 ──────────────────────────────────────────────────────────────────────

const AssociationsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('chamber')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')

  const catData = associations.filter(a => a.category === activeCategory)
  const countries = ['all', ...Array.from(new Set(catData.map(a => a.country)))]

  const filtered = catData.filter(a => {
    const q = searchQuery.toLowerCase()
    const matchSearch = !q ||
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      (a.address ?? '').toLowerCase().includes(q) ||
      (a.surnames ?? []).some(s => s.toLowerCase().includes(q)) ||
      (a.tags ?? []).some(t => t.toLowerCase().includes(q)) ||
      a.description.toLowerCase().includes(q)
    const matchCountry = selectedCountry === 'all' || a.country === selectedCountry
    return matchSearch && matchCountry
  })

  const activeCat = CATEGORIES.find(c => c.key === activeCategory)!

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">官方侨联 · 宗亲 · 档案</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            寻根问祖的权威资源，覆盖东南亚主要国家商会、姓氏宗亲会、历史档案及国内对口机构
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setSelectedCountry('all'); setSearchQuery('') }}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                activeCategory === cat.key
                  ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                  : 'bg-white border-gray-100 text-gray-600 hover:border-amber-300 hover:shadow-sm'
              }`}
            >
              {cat.icon}
              <span className="font-semibold text-sm">{cat.label}</span>
              <span className={`text-xs text-center leading-tight hidden md:block ${activeCategory === cat.key ? 'text-amber-100' : 'text-gray-400'}`}>
                {cat.desc}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`搜索${activeCat.label}…`}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="md:w-40 w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
          >
            <option value="all">所有地区</option>
            {countries.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="text-sm text-gray-400 whitespace-nowrap">
            共 <span className="font-semibold text-amber-600">{filtered.length}</span> 条
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(a => <AssocCard key={a.id} assoc={a} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <Building2 className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">没有找到匹配的结果</p>
          </div>
        )}

        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-800">联系建议</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { emoji: '📝', title: '提前准备信息', desc: '姓氏、祖籍村庄、祖辈姓名、下南洋年代及已知亲属信息' },
              { emoji: '🌐', title: '多语言沟通',   desc: '大部分侨联可用中文，部分支持闽南话/潮汕话/英语' },
              { emoji: '📷', title: '附上老照片',   desc: '祖辈老照片、家族信物、侨批原件有助于缩小查询范围' },
              { emoji: '⏳', title: '耐心跟进',     desc: '宗亲档案查询通常需要数周，请定期礼貌跟进' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl">{item.emoji}</div>
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>注意：</strong>社交媒体账号及联系方式可能随时更新，建议优先通过官方网站核实最新信息。X / Instagram / Line 链接仅供参考，请以各机构官网公布为准。
          </div>
        </div>

      </div>
    </div>
  )
}

export default AssociationsPage
