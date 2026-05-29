import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, X, ScanText, MapPin, Search, Globe, 
  CheckCircle, Camera, FileText, MessageSquare, 
  Clock, Award, Users
} from 'lucide-react'
import { useAppStore } from '../store/appStore'

const IntelligentParser: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ocr' | 'location' | 'dialect'>('ocr')
  const [loading, setLoading] = useState(false)
  const [parseResults, setParseResults] = useState<any>(null)
  const [locationInput, setLocationInput] = useState('')
  const [dialectInput, setDialectInput] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sampleOcrResults = [
    { type: '姓名', value: '陈金生', confidence: 95, highlight: true },
    { type: '地名', value: '同安', confidence: 88, highlight: true },
    { type: '商号', value: '和成信局', confidence: 92, highlight: true },
    { type: '郡望', value: '颍川', confidence: 85, highlight: true },
    { type: '年份', value: '民国三十七年', confidence: 78, highlight: false },
  ]

  const locationMatches = [
    { name: '同安', currentRegion: '福建省厦门市', historicalName: '同安县', confidence: 96 },
    { name: '南安', currentRegion: '福建省泉州市', historicalName: '南安县', confidence: 82 },
    { name: '晋江', currentRegion: '福建省泉州市', historicalName: '晋江县', confidence: 75 },
  ]

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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    
    for (const file of files) {
      const preview = URL.createObjectURL(file)
      setUploadedImages(prev => [...prev, preview])
    }
  }

  const handleAnalyzeImage = async () => {
    if (uploadedImages.length === 0) return
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setParseResults(sampleOcrResults)
    setLoading(false)
  }

  const handleLocationSearch = async () => {
    if (!locationInput) return
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setParseResults(locationMatches)
    setLoading(false)
  }

  const handleDialectSearch = async () => {
    if (!dialectInput) return
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const input = dialectInput.trim()
    const matchedSurnames = surnameDatabase.filter(item => 
      item.dialectPronunciation.some(pronunciation => 
        pronunciation.toLowerCase() === input.toLowerCase() ||
        pronunciation.toLowerCase().includes(input.toLowerCase()) ||
        item.surname.toLowerCase().includes(input.toLowerCase())
      )
    )
    
    if (matchedSurnames.length > 0) {
      setParseResults(matchedSurnames)
    } else {
      setParseResults([{
        notFound: true,
        searchInput: input,
        message: '未找到对应的姓氏，建议尝试其他拼写方式或联系宗亲会查询'
      }])
    }
    
    setLoading(false)
  }

  const renderOcrResults = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <ScanText className="w-5 h-5" />
          智能识别结果
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          {parseResults?.map((result: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg ${result.highlight ? 'bg-yellow-100 border border-yellow-300' : 'bg-white border border-gray-200'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500">{result.type}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${result.confidence >= 85 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {result.confidence}% 置信度
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">{result.value}</div>
            </motion.div>
          ))}
        </div>

        {parseResults?.some((r: any) => r.type === '郡望') && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h5 className="font-semibold text-purple-800 mb-2">💡 郡望提示</h5>
            <p className="text-purple-700 text-sm">
              "颍川" 通常对应 <span className="font-bold">陈姓</span>。
              建议搜索 "颍川" 相关的宗亲会，可能更容易找到线索。
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-3 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#D35400] transition-colors">
          导出分析结果
        </button>
        <button className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          保存为档案
        </button>
      </div>
    </div>
  )

  const renderLocationResults = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          地名匹配结果
        </h4>
        
        <div className="space-y-4">
          {parseResults?.map((match: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-5 rounded-lg border border-green-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="text-xl font-bold text-gray-800">{match.name}</h5>
                  <p className="text-sm text-gray-500">今 {match.currentRegion}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  {match.confidence}%
                </span>
              </div>
              {match.historicalName && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">历史名称：</span>
                  {match.historicalName}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h5 className="font-semibold text-amber-800 mb-3">📖 历史小知识</h5>
        <p className="text-amber-700 text-sm">
          "同安" 在历史上曾属于泉州府，现在隶属于厦门市。
          同安人下南洋主要去往马来西亚槟城、新加坡、泰国等地。
        </p>
      </div>
    </div>
  )

  const renderDialectResults = () => {
    if (parseResults?.[0]?.notFound) {
      return (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h4 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              未找到匹配结果
            </h4>
            <p className="text-orange-700 mb-4">
              搜索 "{parseResults[0].searchInput}" 未找到对应的姓氏。
            </p>
            <p className="text-orange-600 text-sm">
              {parseResults[0].message}
            </p>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <h6 className="text-sm font-semibold text-gray-700 mb-2">常见姓氏拼写参考:</h6>
              <div className="flex flex-wrap gap-2">
                {['Tan (陈)', 'Lim (林)', 'Ng (黄/吴)', 'Ong (王)', 'Lee (李)', 'Teo (张)'].map((hint, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {hint}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            方言翻译与宗亲会
          </h4>
          
          <div className="space-y-6">
            {parseResults?.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-5 rounded-lg border border-purple-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-gray-800">{item.surname}姓</h5>
                    <p className="text-sm text-gray-500">
                      方言发音: {Array.isArray(item.dialectPronunciation) ? item.dialectPronunciation.join(' / ') : item.dialectPronunciation} | 堂号: {item.hallName}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h6 className="text-sm font-semibold text-gray-600 mb-2">相关宗亲会:</h6>
                  {item.locations.map((loc: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {loc}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-[#5D4037] mb-4">
            智能线索解析器
          </h1>
          <p className="text-[#8D6E63] max-w-2xl mx-auto text-lg">
            上传照片、输入模糊线索，让AI帮你解析可检索的寻根信息
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-100">
            {[
              { id: 'ocr', label: '照片/OCR解析', icon: Camera, description: '侨批、墓碑、老照片' },
              { id: 'location', label: '模糊地名匹配', icon: MapPin, description: '方言/英文拼写的地名' },
              { id: 'dialect', label: '方言翻译器', icon: MessageSquare, description: '音译姓名、堂号' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-5 px-6 text-center transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#E67E22] text-white border-b-2 border-[#E67E22]'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border-b-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <tab.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{tab.label}</div>
                    <div className="text-xs opacity-80">{tab.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'ocr' && (
                <motion.div
                  key="ocr"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#5D4037] mb-3">
                      上传照片进行OCR解析
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      支持上传侨批、墓碑、老照片等。系统将自动识别并高亮显示人名、地名、郡望等关键信息。
                    </p>

                    {uploadedImages.length === 0 ? (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#E67E22] transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium mb-2">点击或拖拽上传照片</p>
                        <p className="text-sm text-gray-400">支持JPG、PNG格式</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          {uploadedImages.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={img}
                                alt={`upload-${idx}`}
                                className="w-full h-40 object-cover rounded-xl"
                              />
                              <button
                                onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={handleAnalyzeImage}
                          disabled={loading}
                          className="w-full py-4 bg-gradient-to-r from-[#E67E22] to-amber-500 text-white rounded-xl font-semibold hover:from-[#D35400] hover:to-orange-500 transition-all shadow-lg disabled:opacity-50"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Clock className="w-5 h-5 animate-spin" />
                              AI分析中...
                            </span>
                          ) : (
                            '开始智能解析'
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {parseResults && renderOcrResults()}
                </motion.div>
              )}

              {activeTab === 'location' && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#5D4037] mb-3">
                      输入模糊地名
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      像 "Tong An, Fujian" 这样的拼音或英文拼写，系统会智能匹配对应的中文地名。
                    </p>

                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="例如: Tong An, Chin Chew, Amoy"
                        className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                      />
                      <button
                        onClick={handleLocationSearch}
                        disabled={loading || !locationInput}
                        className="px-8 py-4 bg-gradient-to-r from-[#E67E22] to-amber-500 text-white rounded-xl font-semibold hover:from-[#D35400] hover:to-orange-500 transition-all shadow-lg disabled:opacity-50"
                      >
                        {loading ? '搜索中...' : '智能匹配'}
                      </button>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {['Tong An', 'Chin Chew', 'Amoy', 'Penang', 'Singapore'].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLocationInput(term)}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {parseResults && renderLocationResults()}
                </motion.div>
              )}

              {activeTab === 'dialect' && (
                <motion.div
                  key="dialect"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#5D4037] mb-3">
                      方言音译翻译
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      输入用英文/马来文拼写的方言发音，如 "Tan"、"Lim"，系统将识别对应姓氏和堂号。
                    </p>

                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={dialectInput}
                        onChange={(e) => setDialectInput(e.target.value)}
                        placeholder="例如: Tan, Lim, Koh, Teo"
                        className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                      />
                      <button
                        onClick={handleDialectSearch}
                        disabled={loading || !dialectInput}
                        className="px-8 py-4 bg-gradient-to-r from-[#E67E22] to-amber-500 text-white rounded-xl font-semibold hover:from-[#D35400] hover:to-orange-500 transition-all shadow-lg disabled:opacity-50"
                      >
                        {loading ? '翻译中...' : '翻译姓氏'}
                      </button>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {['Tan', 'Lim', 'Koh', 'Teo', 'Ng', 'Chua'].map((term) => (
                        <button
                          key={term}
                          onClick={() => setDialectInput(term)}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {parseResults && renderDialectResults()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <Award className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">侨批解读</h4>
            <p className="text-gray-600 text-sm">学习如何从侨批中提取关键信息</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <FileText className="w-8 h-8 text-blue-500 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">墓碑研究</h4>
            <p className="text-gray-600 text-sm">墓碑上的郡望和地名解析</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <Users className="w-8 h-8 text-purple-500 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">会馆黄页</h4>
            <p className="text-gray-600 text-sm">查找东南亚各国的宗亲会</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntelligentParser
