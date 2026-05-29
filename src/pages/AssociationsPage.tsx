import React, { useState } from 'react'
import { MapPin, Phone, Mail, Globe, Search, Building2, ExternalLink, Info } from 'lucide-react'

interface Association {
  id: string
  name: string
  country: string
  countryFlag: string
  city: string
  description: string
  website?: string
}

const associations: Association[] = [
  {
    id: 'sg-sccci',
    name: '新加坡中华总商会 (SCCCI)',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    description: '新加坡最具影响力的华商组织，成立于1906年，是新加坡历史最悠久的商会之一',
    website: 'https://www.sccci.org.sg'
  },
  {
    id: 'sg-sfcca',
    name: '新加坡宗乡会馆联合总会 (SFCCA)',
    country: '新加坡',
    countryFlag: '🇸🇬',
    city: '新加坡',
    description: '新加坡华人华侨社团的最高领导机构，代表超过200个宗乡会馆',
    website: 'https://www.sfcca.sg'
  },
  {
    id: 'my-acccim',
    name: '马来西亚中华总商会 (中总 - ACCCIM)',
    country: '马来西亚',
    countryFlag: '🇲🇾',
    city: '吉隆坡',
    description: '全马华商的核心代表，成立于1949年，是马来西亚最大的华商组织',
    website: 'https://www.acccim.org.my'
  },
  {
    id: 'my-huazong',
    name: '马来西亚华人大会堂总会 (华总 - Huazong)',
    country: '马来西亚',
    countryFlag: '🇲🇾',
    city: '吉隆坡',
    description: '代表全马华人社团的最高领导机构，侧重文化与侨务工作',
    website: 'https://www.huazong.my'
  },
  {
    id: 'th-tcc',
    name: '泰国中华总商会 (TCC)',
    country: '泰国',
    countryFlag: '🇹🇭',
    city: '曼谷',
    description: '在泰国政商界拥有极高地位，是泰国最具影响力的华人商会',
    website: 'https://www.thaicc.org'
  },
  {
    id: 'th-chaozhou',
    name: '泰国潮州会馆',
    country: '泰国',
    countryFlag: '🇹🇭',
    city: '曼谷',
    description: '泰国最大的华人地缘社团，会员众多，影响力巨大',
  },
  {
    id: 'id-permit',
    name: '印尼中华总商会 (PERMIT)',
    country: '印度尼西亚',
    countryFlag: '🇮🇩',
    city: '雅加达',
    description: '印尼华商的核心组织，致力于促进中印尼经贸合作',
    website: 'https://www.indonesian-chinesechamber.org'
  },
  {
    id: 'id-inti',
    name: '印尼华裔总会 (INTI)',
    country: '印度尼西亚',
    countryFlag: '🇮🇩',
    city: '雅加达',
    description: '印尼主要的华人社团之一，关注华裔权益和文化传承',
  },
  {
    id: 'ph-ffcccii',
    name: '菲律宾菲华商联总会 (FFCCCII)',
    country: '菲律宾',
    countryFlag: '🇵🇭',
    city: '马尼拉',
    description: '菲律宾华社的"龙头"组织，简称"商总"，成立于1954年',
    website: 'https://www.ffcccii.org'
  },
  {
    id: 'vn-cbcc',
    name: '中国商会越南分会',
    country: '越南',
    countryFlag: '🇻🇳',
    city: '河内/胡志明市',
    description: '由在越中资企业及常驻代表机构组成的非营利性社团组织',
    website: 'https://www.cbccvn.org'
  },
]

const AssociationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')

  const countries = ['all', ...new Set(associations.map(a => a.country))]

  const filteredAssociations = associations.filter(assoc => {
    const matchesSearch = 
      assoc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assoc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assoc.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = selectedCountry === 'all' || assoc.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">东南亚侨联/商会联系方式</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            如果您在寻根问祖过程中需要帮助，可以联系这些官方侨联和商会组织，他们拥有丰富的本地资源和历史资料
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索侨联、商会、城市..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="all">所有国家</option>
                {countries.filter(c => c !== 'all').map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssociations.map((assoc) => (
            <div key={assoc.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-white" />
                    <span className="text-white font-medium">{assoc.countryFlag} {assoc.country}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{assoc.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{assoc.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">所在城市</p>
                      <p className="text-gray-700 text-sm">{assoc.city}</p>
                    </div>
                  </div>
                  
                  {assoc.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">官方网站</p>
                        <a 
                          href={assoc.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                        >
                          {assoc.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssociations.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的侨联或商会</p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
          <div className="flex items-start gap-3 mb-6">
            <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <h2 className="text-2xl font-bold text-gray-800">如何获取最新联系方式？</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">途径一：官方渠道对接（最推荐）</h3>
              <p className="text-gray-600 text-sm mb-3">
                通过中国各省市的"侨联"或"贸促会"对接，他们拥有最完整的东南亚侨领名册。
              </p>
              <ul className="text-sm text-amber-600 space-y-1">
                <li>• 中国侨联网：chinaql.org</li>
                <li>• 各省归国华侨联合会</li>
                <li>• 中国贸促会海外代表处</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">途径二：大使馆官网查询</h3>
              <p className="text-gray-600 text-sm mb-3">
                中国驻东南亚各国大使馆的经济商务处官网，通常有"当地主要商协会"栏目。
              </p>
              <p className="text-sm text-gray-500">
                搜索格式："中国驻XX国大使馆经商处"
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">途径三：社交媒体联系</h3>
              <p className="text-gray-600 text-sm mb-3">
                许多华商组织在微信公众号、Facebook和LinkedIn上非常活跃，留言通常能在1-2个工作日内得到回复。
              </p>
              <p className="text-sm text-gray-500">
                例如：马来西亚中总青商团、泰国中总青商会
              </p>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>注意：</strong>由于机构的秘书处人员或联系电话可能会有变动，建议直接通过其官方网站、官方微信公众号或中国驻当地大使馆经商处获取最新信息。
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">使用建议</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">提前准备信息</h3>
              <p className="text-gray-600 text-sm">
                联系前请准备好姓氏、祖籍村庄、祖辈姓名、下南洋年代等信息
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">多语言沟通</h3>
              <p className="text-gray-600 text-sm">
                大部分侨联都可以用中文沟通，部分也支持当地语言和英语
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📷</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">使用老照片</h3>
              <p className="text-gray-600 text-sm">
                如果有祖辈的老照片、家族信物，也可以一同提供
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">耐心等待</h3>
              <p className="text-gray-600 text-sm">
                查询宗亲资料可能需要时间，请保持耐心并定期跟进
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssociationsPage
