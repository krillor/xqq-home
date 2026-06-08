import React, { useState } from 'react'
import { MapPin, Phone, Mail, Globe, Search, Building2, ExternalLink, Info } from 'lucide-react'

// ─── 类型定义 ──────────────────────────────────────────────────────────────────

type Category = 'chamber' | 'china'

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
    description: '成立于1906年，新加坡最具影响力的华商总商会，历史档案丰富',
    website: 'https://www.sccci.org.sg',
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
  },
  {
    id: 'hk-cgcc',
    category: 'chamber',
    name: '香港中华总商会 (CGCC)',
    country: '香港',
    countryFlag: '🇭🇰',
    city: '香港',
    address: '香港中环干诺道中24-25号香港中华总商会大厦',
    phone: '+852 2525 6385',
    email: 'info@cgcc.org.hk',
    description: '成立于1900年，香港历史最悠久的华商总商会，联系两岸三地及海外华商网络',
    website: 'https://www.cgcc.org.hk',
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
]


// ─── 卡片组件 ──────────────────────────────────────────────────────────────────

const AssocCard: React.FC<{ assoc: Association }> = ({ assoc }) => (
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
      <h3 className="text-sm font-bold text-gray-800 leading-snug">{assoc.name}</h3>
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
    </div>
  </div>
)

// ─── 主页面 ──────────────────────────────────────────────────────────────────────

const AssociationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = associations.filter(a => {
    const q = searchQuery.toLowerCase()
    return !q ||
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      (a.address ?? '').toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
  })

  const chambers = filtered.filter(a => a.category === 'chamber')
  const china = filtered.filter(a => a.category === 'china')

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">官方侨联 · 商会</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            覆盖东南亚主要国家商会、侨联及国内对口机构
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索机构名称、国家…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {chambers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-700 mb-4">商会 / 侨联</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {chambers.map(a => <AssocCard key={a.id} assoc={a} />)}
            </div>
          </section>
        )}

        {china.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-700 mb-4">国内对口机构</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {china.map(a => <AssocCard key={a.id} assoc={a} />)}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Building2 className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">没有找到匹配的结果</p>
          </div>
        )}

        <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-800">联系建议</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { emoji: '📝', title: '提前准备信息', desc: '姓氏、祖籍村庄、祖辈姓名、下南洋年代及已知亲属信息' },
              { emoji: '🌐', title: '多语言沟通',   desc: '大部分侨联可用中文，部分支持闽南话/潮汕话/英语' },
              { emoji: '📷', title: '附上老照片',   desc: '祖辈老照片、家族信物、侨批原件有助于缩小查询范围' },
              { emoji: '⏳', title: '耐心跟进',     desc: '档案查询通常需要数周，请定期礼貌跟进' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl">{item.emoji}</div>
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>注意：</strong>联系方式可能随时更新，建议优先通过官方网站核实最新信息。
          </div>
        </div>

      </div>
    </div>
  )
}

export default AssociationsPage
