import React, { useState } from 'react'
import { MapPin, Phone, Mail, Globe, Search, Building2, ExternalLink, Info, ChevronRight } from 'lucide-react'

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
  {
    id: 'vn-chba',
    category: 'chamber',
    name: '越南华人工商总会',
    country: '越南',
    countryFlag: '🇻🇳',
    city: '胡志明市',
    address: '234 Trần Hưng Đạo, Quận 1, TP.HCM',
    phone: '+84 28 3836 9003',
    description: '越南最大华人商业总会，以胡志明市华人聚居区为核心，联系越南各省华商网络',
  },
  {
    id: 'mm-cccm',
    category: 'chamber',
    name: '缅甸中华总商会 (CCCM)',
    country: '缅甸',
    countryFlag: '🇲🇲',
    city: '仰光',
    address: 'No.150-152, Shwe Bon Thar Street, Kyauktada Township, Yangon',
    phone: '+95 1 246 320',
    description: '缅甸华商最高代表机构，成立逾百年，覆盖仰光及曼德勒等主要华人聚居城市',
  },
  {
    id: 'kh-cccik',
    category: 'chamber',
    name: '柬埔寨华人工商总会',
    country: '柬埔寨',
    countryFlag: '🇰🇭',
    city: '金边',
    address: 'No. 64, Street 110, Phnom Penh',
    phone: '+855 23 217 808',
    description: '柬埔寨华人社区最具代表性的商业总会，积极促进中柬经贸与文化交流',
  },
  {
    id: 'bn-ccic',
    category: 'chamber',
    name: '文莱中华总商会 (CCIB)',
    country: '文莱',
    countryFlag: '🇧🇳',
    city: '斯里巴加湾',
    address: 'No.72, Jalan Roberts, Bandar Seri Begawan BS8711',
    phone: '+673 222 3718',
    description: '文莱唯一的华人综合商会，代表文莱华商与政府及国际商界沟通联络',
    website: 'https://www.ccib.org.bn',
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
  <div className="group bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
    {/* 顶部旗帜区 */}
    <div className="relative px-5 pt-6 pb-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
          {assoc.countryFlag}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {assoc.country}
            </span>
            {assoc.city && assoc.city !== assoc.country && (
              <span className="text-xs text-gray-400 flex items-center gap-0.5">
                <MapPin className="w-3 h-3" />{assoc.city}
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-gray-800 leading-snug">{assoc.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-gray-500 text-xs leading-relaxed">{assoc.description}</p>
    </div>

    {/* 分割线 */}
    <div className="mx-5 border-t border-dashed border-gray-100" />

    {/* 联系信息区 */}
    <div className="px-5 py-4 flex flex-col gap-2 flex-1">
      {assoc.address && (
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
          <span className="leading-relaxed">{assoc.address}</span>
        </div>
      )}
      {assoc.phone && (
        <div className="flex items-center gap-2 text-xs">
          <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <a href={`tel:${assoc.phone}`} className="text-gray-600 hover:text-amber-600 transition-colors">{assoc.phone}</a>
        </div>
      )}
      {assoc.email && (
        <div className="flex items-center gap-2 text-xs">
          <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <a href={`mailto:${assoc.email}`} className="text-amber-600 hover:text-amber-700 transition-colors truncate">{assoc.email}</a>
        </div>
      )}
    </div>

    {/* 底部操作区 */}
    <div className="px-5 pb-5">
      {assoc.website ? (
        <a
          href={assoc.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-xl transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          访问官方网站
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      ) : (
        <div className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-50 text-gray-400 text-xs rounded-xl border border-dashed border-gray-200">
          暂无官方网站
        </div>
      )}
    </div>
  </div>
)

// ─── Section 标题 ──────────────────────────────────────────────────────────────

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; count: number }> = ({ icon, title, count }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
      {icon}
    </div>
    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">{count} 个</span>
    <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent" />
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

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#5D4037] via-[#795548] to-[#8D6E63] text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-orange-200" />
              <span className="text-orange-200 text-sm font-medium tracking-wide">官方侨联 · 商会</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              连接海内外华人社群
            </h1>
            <p className="text-orange-100 text-base leading-relaxed mb-6">
              收录东南亚10个国家及地区总商会与中国侨联，是寻亲路上最可信赖的官方支援网络
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: '覆盖国家/地区', value: '10+' },
                { label: '官方商会', value: '10' },
                { label: '国内对口机构', value: '1' },
              ].map(s => (
                <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 text-center">
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-orange-200 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* 搜索栏 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-10 -mt-6 relative z-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索机构名称、国家或城市…"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* 商会 / 侨联 */}
        {chambers.length > 0 && (
          <section className="mb-12">
            <SectionTitle
              icon={<Building2 className="w-4 h-4" />}
              title="各国华人总商会"
              count={chambers.length}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {chambers.map(a => <AssocCard key={a.id} assoc={a} />)}
            </div>
          </section>
        )}

        {/* 国内对口机构 */}
        {china.length > 0 && (
          <section className="mb-12">
            <SectionTitle
              icon={<ChevronRight className="w-4 h-4" />}
              title="国内对口机构"
              count={china.length}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {china.map(a => <AssocCard key={a.id} assoc={a} />)}
            </div>
          </section>
        )}

        {/* 无结果 */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <Building2 className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">没有找到匹配的结果</p>
          </div>
        )}

        {/* 联系建议 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-5 border-b border-amber-100 flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-gray-800">联系建议</h2>
          </div>
          <div className="px-8 py-7">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { emoji: '📝', title: '提前准备信息', desc: '姓氏、祖籍村庄、祖辈姓名、下南洋年代及已知亲属信息' },
                { emoji: '🌐', title: '多语言沟通',   desc: '大部分侨联可用中文，部分支持闽南话/潮汕话/英语' },
                { emoji: '📷', title: '附上老照片',   desc: '祖辈老照片、家族信物、侨批原件有助于缩小查询范围' },
                { emoji: '⏳', title: '耐心跟进',     desc: '档案查询通常需要数周，请定期礼貌跟进' },
              ].map(item => (
                <div key={item.title} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">{item.emoji}</div>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
              <strong>注意：</strong>联系方式可能随时更新，建议优先通过官方网站核实最新信息。部分机构暂无官网，可通过电话或邮件联系。
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AssociationsPage
