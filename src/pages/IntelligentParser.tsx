import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapPin, Search, MessageSquare, Users } from 'lucide-react'
import { regionData, placeNameAlias } from '../data/regionData'

const IntelligentParser: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'location' | 'dialect'>('location')
  const [loading, setLoading] = useState(false)
  const [parseResults, setParseResults] = useState<any>(null)
  const [locationInput, setLocationInput] = useState('')
  const [dialectInput, setDialectInput] = useState('')
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const historicalNames: Record<string, string> = {
    '同安': '同安县', '南安': '南安县', '晋江': '晋江县', '泉州': '泉州府',
    '漳州': '漳州府', '福州': '闽县', '厦门': '厦门厅', '潮州': '潮州府',
    '汕头': '汕头埠', '广州': '番禺县', '深圳': '新安县', '曼谷': '暹罗',
    '新加坡': '新嘉坡', '吉隆坡': '吉隆坡', '槟城': '槟榔屿', '雅加达': '巴达维亚',
  }

  const searchLocation = (input: string) => {
    const q = input.trim().toLowerCase()
    if (!q) return []
    const results: { name: string; currentRegion: string; historicalName?: string; confidence: number }[] = []
    const seen = new Set<string>()
    for (const [key, aliases] of Object.entries(placeNameAlias)) {
      const matchesKey = key.toLowerCase().includes(q)
      const matchesAlias = aliases.some(a => a.toLowerCase().includes(q))
      if (matchesKey || matchesAlias) {
        const primaryAlias = aliases[0]
        if (!seen.has(primaryAlias)) {
          seen.add(primaryAlias)
          results.push({ name: primaryAlias, currentRegion: key, historicalName: historicalNames[primaryAlias], confidence: matchesAlias ? 95 : 80 })
        }
      }
    }
    for (const country of regionData) {
      for (const province of country.provinces) {
        const provinceMatch = province.nameCn.toLowerCase().includes(q) || (province.nameEn?.toLowerCase().includes(q) ?? false)
        for (const city of province.cities) {
          const cityMatch = city.nameCn.toLowerCase().includes(q) || (city.nameEn?.toLowerCase().includes(q) ?? false) || (city.nameLocal?.toLowerCase().includes(q) ?? false) || (city.alias?.some(a => a.toLowerCase().includes(q)) ?? false)
          if ((cityMatch || provinceMatch) && !seen.has(city.nameCn)) {
            seen.add(city.nameCn)
            const regionLabel = country.nameCn === city.nameCn ? country.nameCn : `${country.nameCn} ${province.nameCn}`
            results.push({ name: city.nameCn, currentRegion: regionLabel, historicalName: historicalNames[city.nameCn], confidence: cityMatch ? 90 : 70 })
          }
        }
      }
    }
    return results.sort((a, b) => b.confidence - a.confidence).slice(0, 6)
  }

  const surnameDatabase = [
    { surname: '陈', dialectPronunciation: ['Tan', 'Chan', 'Chen'], hallName: '颍川', locations: ['马来西亚槟城颍川公司', '新加坡颍川公所', '泰国陈氏宗亲总会'] },
    { surname: '林', dialectPronunciation: ['Lim', 'Lam', 'Lin'], hallName: '西河', locations: ['马来西亚吉隆坡林氏宗祠', '新加坡西河林氏公会', '泰国林氏宗亲总会'] },
    { surname: '黄', dialectPronunciation: ['Ng', 'Wong', 'Huang'], hallName: '江夏', locations: ['马来西亚黄氏宗祠', '新加坡江夏公所', '泰国黄氏宗亲总会'] },
    { surname: '王', dialectPronunciation: ['Ong', 'Wong', 'Wang'], hallName: '太原', locations: ['马来西亚太原王氏宗祠', '新加坡王氏公会', '泰国王氏宗亲总会'] },
    { surname: '李', dialectPronunciation: ['Lee', 'Li'], hallName: '陇西', locations: ['马来西亚陇西李氏宗祠', '新加坡李氏公会', '泰国李氏宗亲总会'] },
    { surname: '张', dialectPronunciation: ['Teo', 'Cheong', 'Zhang'], hallName: '清河', locations: ['马来西亚清河张氏宗祠', '新加坡张氏公会', '泰国张氏宗亲总会'] },
    { surname: '许', dialectPronunciation: ['Koh', 'Xu'], hallName: '高阳', locations: ['马来西亚高阳许氏公会', '新加坡许氏公会', '泰国许氏宗亲总会'] },
    { surname: '蔡', dialectPronunciation: ['Chua', 'Cai'], hallName: '济阳', locations: ['马来西亚济阳蔡氏公会', '新加坡蔡氏公会', '泰国蔡氏宗亲总会'] },
    { surname: '郑', dialectPronunciation: ['Tay', 'Teh', 'Zheng'], hallName: '荥阳', locations: ['马来西亚荥阳郑氏公会', '新加坡郑氏公会', '泰国郑氏宗亲总会'] },
    { surname: '吴', dialectPronunciation: ['Goh', 'Ng', 'Wu'], hallName: '延陵', locations: ['马来西亚延陵吴氏公会', '新加坡吴氏公会', '泰国吴氏宗亲总会'] },
  ]

  const handleLocationSearch = async () => {
    if (!locationInput) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    const matches = searchLocation(locationInput)
    setParseResults(matches.length > 0 ? matches : [{ notFound: true, searchInput: locationInput.trim(), message: '未找到匹配地名，建议尝试中文、英文或方言拼写' }])
    setLoading(false)
  }

  const handleDialectSearch = async () => {
    if (!dialectInput) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const input = dialectInput.trim()
    const matched = surnameDatabase.filter(item =>
      item.dialectPronunciation.some(p => p.toLowerCase() === input.toLowerCase() || p.toLowerCase().includes(input.toLowerCase())) ||
      item.surname.includes(input)
    )
    setParseResults(matched.length > 0 ? matched : [{ notFound: true, searchInput: input, message: '未找到对应姓氏，建议尝试其他拼写方式' }])
    setLoading(false)
  }

  const switchTab = (tab: 'location' | 'dialect') => {
    setActiveTab(tab)
    setParseResults(null)
  }

  const locationGroups = [
    {
      region: '🇨🇳 福建',
      terms: [
        { label: 'Amoy', hint: '厦门' }, { label: 'Chin Chew', hint: '泉州' },
        { label: 'Tong An', hint: '同安' }, { label: 'Foochow', hint: '福州' },
        { label: 'Changchow', hint: '漳州' }, { label: 'Nan An', hint: '南安' },
        { label: 'Jinjiang', hint: '晋江' }, { label: 'Anxi', hint: '安溪' },
        { label: 'Yongchun', hint: '永春' }, { label: 'Putian', hint: '莆田' },
        { label: 'Zhangpu', hint: '漳浦' }, { label: 'Longhai', hint: '龙海' },
      ],
    },
    {
      region: '🇨🇳 广东',
      terms: [
        { label: 'Swatow', hint: '汕头' }, { label: 'Teochew', hint: '潮州' },
        { label: 'Canton', hint: '广州' }, { label: 'Hakka', hint: '客家/梅州' },
        { label: 'Jiaying', hint: '嘉应州' }, { label: 'Chaoan', hint: '潮安' },
        { label: 'Jieyang', hint: '揭阳' }, { label: 'Raoping', hint: '饶平' },
        { label: 'Hainan', hint: '海南' },
      ],
    },
    {
      region: '🌏 东南亚',
      terms: [
        { label: 'Singapore', hint: '新加坡' }, { label: 'Penang', hint: '槟城' },
        { label: 'Kuala Lumpur', hint: '吉隆坡' }, { label: 'Ipoh', hint: '怡保' },
        { label: 'Johor', hint: '柔佛' }, { label: 'Malacca', hint: '马六甲' },
        { label: 'Bangkok', hint: '曼谷' }, { label: 'Siam', hint: '泰国/暹罗' },
        { label: 'Saigon', hint: '胡志明市' }, { label: 'Batavia', hint: '雅加达' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* 页面标题 */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#5D4037] mb-2">{t('tools.title')}</h1>
          <p className="text-[#8D6E63]">{t('tools.subtitle')}</p>
        </motion.div>

        {/* Tab 导航 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-hidden rounded-t-2xl">
            {[
              { id: 'location' as const, label: t('tools.tabLocation'), icon: MapPin, sub: t('tools.tabLocationSub') },
              { id: 'dialect' as const, label: t('tools.tabDialect'), icon: MessageSquare, sub: t('tools.tabDialectSub') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`flex-1 py-4 px-4 flex items-center justify-center gap-2.5 transition-all text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#E67E22] text-[#E67E22] bg-orange-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-xs font-normal opacity-60">{tab.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab 内容 */}
          <div className="p-6">
            <AnimatePresence mode="wait">

              {/* ── 地名匹配 ── */}
              {activeTab === 'location' && (
                <motion.div key="location" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {/* 搜索框 */}
                  <div className="flex gap-3 mb-5">
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                      placeholder={t('tools.locationPlaceholder')}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none text-sm transition-colors"
                    />
                    <button
                      onClick={handleLocationSearch}
                      disabled={loading || !locationInput}
                      className="px-6 py-3 bg-[#E67E22] text-white rounded-xl text-sm font-semibold hover:bg-[#D35400] transition-colors disabled:opacity-50"
                    >
                      {loading ? t('tools.matching') : t('tools.match')}
                    </button>
                  </div>

                  {/* 常用地名下拉列表 */}
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {locationGroups.map((group) => (
                      <div key={group.region} className="relative">
                        <button
                          onClick={() => setOpenGroup(openGroup === group.region ? null : group.region)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                            openGroup === group.region
                              ? 'bg-amber-50 border-amber-300 text-amber-700'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {group.region}
                          <span className={`transition-transform duration-200 ${openGroup === group.region ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        {openGroup === group.region && (
                          <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[160px]">
                            {group.terms.map((term) => (
                              <button
                                key={term.label}
                                onClick={() => { setLocationInput(term.label); setParseResults(null); setOpenGroup(null) }}
                                className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-amber-50 hover:text-amber-700 transition-colors text-left"
                              >
                                <span className="font-medium text-gray-700 hover:text-amber-700">{term.label}</span>
                                <span className="text-gray-400 ml-4">{term.hint}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 地名匹配结果 */}
                  {parseResults && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      {parseResults[0]?.notFound ? (
                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-700">
                          <Search className="w-4 h-4 inline mr-1.5" />
                          {t('tools.notFoundLocation')} <span className="font-semibold">"{parseResults[0].searchInput}"</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 mb-3">
                            <MapPin className="w-3.5 h-3.5" /> {t('tools.matchResult')}
                          </div>
                          {parseResults.map((m: { name: string; currentRegion: string; historicalName?: string; confidence: number }, i: number) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl hover:border-amber-200 hover:shadow-sm transition-all"
                            >
                              <div>
                                <span className="font-bold text-gray-800 mr-2">{m.name}</span>
                                <span className="text-sm text-gray-400">{t('tools.now')} {m.currentRegion}</span>
                                {m.historicalName && <span className="ml-2 text-xs text-gray-400">· {t('tools.oldName')} {m.historicalName}</span>}
                              </div>
                              <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full font-medium">{m.confidence}%</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ── 方言翻译器 ── */}
              {activeTab === 'dialect' && (
                <motion.div key="dialect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {/* 搜索框 */}
                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      value={dialectInput}
                      onChange={(e) => setDialectInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleDialectSearch()}
                      placeholder={t('tools.dialectPlaceholder')}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none text-sm transition-colors"
                    />
                    <button
                      onClick={handleDialectSearch}
                      disabled={loading || !dialectInput}
                      className="px-6 py-3 bg-[#E67E22] text-white rounded-xl text-sm font-semibold hover:bg-[#D35400] transition-colors disabled:opacity-50"
                    >
                      {loading ? t('tools.translating') : t('tools.translate')}
                    </button>
                  </div>

                  {/* 快捷标签 */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['Tan', 'Lim', 'Ng', 'Ong', 'Lee', 'Teo', 'Koh', 'Chua', 'Goh', 'Wong'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => { setDialectInput(tag); setParseResults(null) }}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* 方言翻译结果 */}
                  {parseResults && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      {parseResults[0]?.notFound ? (
                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-700">
                          {t('tools.notFoundSurname')} <span className="font-semibold">"{parseResults[0].searchInput}"</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {parseResults.map((item: any, i: number) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="bg-white border border-gray-100 rounded-xl p-4 hover:border-purple-200 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Users className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                  <span className="font-bold text-gray-800 text-base">{item.surname}{t('tools.surnameSuffix')}</span>
                                  <span className="ml-2 text-xs text-gray-400">{t('tools.hallName')}{item.hallName}</span>
                                  <div className="text-xs text-gray-400 mt-0.5">
                                    {t('tools.dialectPron')}{Array.isArray(item.dialectPronunciation) ? item.dialectPronunciation.join(' / ') : item.dialectPronunciation}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                {item.locations.map((loc: string, j: number) => (
                                  <div key={j} className="flex items-center gap-2 text-xs text-gray-600 px-2 py-1.5 bg-gray-50 rounded-lg">
                                    <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                    {loc}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntelligentParser
