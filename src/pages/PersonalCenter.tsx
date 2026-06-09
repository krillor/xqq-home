import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, X, Image as ImageIcon, MapPin, Calendar, 
  CheckCircle, ChevronLeft, ChevronRight, User, 
  Users, Building2, Clock, Sparkles, 
  BookOpen, FileText, Search, Mic, Bell, BellOff, BellRing, Settings, MessageCircle,
  ChevronDown, ChevronUp, Trash2
} from 'lucide-react'
import { useAppStore } from '../store/appStore'
import LocationSelect from '../components/LocationSelect'
import VoiceRecorder from '../components/VoiceRecorder'
import { regionData, regionGroups, Country, Province, City } from '../data/regionData'

const PersonalCenter: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { userRole } = useAppStore()
  // 根据角色决定默认 tab：volunteer 角色默认进志愿者中心，其余进寻根档案
  const defaultTab = searchParams.get('tab') === 'volunteer' ? 'volunteer' :
                     searchParams.get('tab') === 'archive' ? 'archive' :
                     userRole === 'volunteer' ? 'volunteer' : 'archive'
  const [activeTab, setActiveTab] = useState<'archive' | 'volunteer'>(defaultTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-6">个人中心</h1>

          <div className="inline-flex bg-white rounded-xl shadow-md p-1 gap-1">
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'archive'
                  ? 'bg-[#E67E22] text-white shadow-md'
                  : 'text-[#5D4037] hover:bg-orange-50'
              }`}
            >
              发布寻亲
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'volunteer'
                  ? 'bg-[#E67E22] text-white shadow-md'
                  : 'text-[#5D4037] hover:bg-orange-50'
              }`}
            >
              志愿者中心
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <RootSearchArchiveContent key="archive" />
          ) : (
            <VolunteerContent key="volunteer" />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// 寻根档案组件
const RootSearchArchiveContent: React.FC = () => {
  const navigate = useNavigate()
  const { uploadedPhotos, addUploadedPhoto, removeUploadedPhoto, clearUploadedPhotos, addPost, isLoggedIn } = useAppStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    searchType: 'find-china',
    userRole: 'grandchild',
    hasQiaopi: false,
    hasTombstone: false,
    knowsBirthplace: false,
    knowsDialect: false,
    hasDNA: false,
    hasFamilyTree: false,
    hasOldPhotos: false,
    ancestorName: '',
    ancestorBirthYear: '',
    ancestorDepartureYear: '',
    surname: '',
    clanName: '',
    knownGenerations: '',
    estimatedGenerations: '',
    familyStory: '',
    additionalNotes: '',
  })
  
  const [originLocation, setOriginLocation] = useState<{
    countryId?: string;
    provinceId?: string;
    cityId?: string;
    displayName?: string;
  }>()
  
  const [targetLocation, setTargetLocation] = useState<{
    countryId?: string;
    provinceId?: string;
    cityId?: string;
    displayName?: string;
  }>()
  
  const [voiceRecordings, setVoiceRecordings] = useState<Array<{
    id: string;
    url: string;
    duration: number;
  }>>([])
  
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const totalSteps = 5

  const searchTypeOptions = [
    { id: 'find-china', label: '我想找中国的祖籍地/亲人', description: '祖辈下南洋后，我们想找回老家' },
    { id: 'find-overseas', label: '我想找下南洋后失联的亲戚后代', description: '知道老家，想找南洋失联的那一支' },
  ]

  const clueOptions = [
    { id: 'hasQiaopi', label: '有侨批', icon: FileText },
    { id: 'hasTombstone', label: '有墓碑照片', icon: Building2 },
    { id: 'knowsBirthplace', label: '知道籍贯地', icon: MapPin },
    { id: 'knowsDialect', label: '知道方言口音', icon: Search },
    { id: 'hasDNA', label: '有DNA数据', icon: Sparkles },
    { id: 'hasFamilyTree', label: '有家谱', icon: BookOpen },
    { id: 'hasOldPhotos', label: '有老照片', icon: ImageIcon },
  ]

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    for (const file of files.slice(0, 10 - uploadedPhotos.length)) {
      const preview = URL.createObjectURL(file)
      const photoId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      
      addUploadedPhoto({
        id: photoId,
        file,
        preview,
      })
    }
  }

  const calculateGenerations = () => {
    if (!formData.ancestorDepartureYear) return null
    
    const departureYear = parseInt(formData.ancestorDepartureYear)
    const currentYear = new Date().getFullYear()
    const yearsPassed = currentYear - departureYear
    const estimatedGen = Math.floor(yearsPassed / 28)
    
    return {
      yearsPassed,
      estimatedGen,
      birthYearRange: {
        min: departureYear - 30,
        max: departureYear - 10,
      }
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleVoiceRecordingComplete = (audioBlob: Blob, duration: number) => {
    const url = URL.createObjectURL(audioBlob)
    setVoiceRecordings(prev => [...prev, {
      id: Date.now().toString(),
      url,
      duration
    }])
  }

  const removeVoiceRecording = (id: string) => {
    setVoiceRecordings(prev => prev.filter(r => r.id !== id))
  }

  const handleSubmit = () => {
    const originDisplay = originLocation?.displayName || '未知'
    const targetDisplay = targetLocation?.displayName || '未知'
    
    addPost({
      title: `${formData.surname || '某'}氏寻根 - ${originDisplay} → ${targetDisplay}`,
      description: formData.familyStory || formData.additionalNotes || '',
      surname: formData.surname,
      originRegion: originDisplay,
      targetRegion: targetDisplay,
      seekerType: formData.searchType === 'find-china' ? 'overseas-china' : 'china-overseas',
      status: 'active',
      photos: uploadedPhotos,
      createdBy: currentStep === 1 ? '匿名' : formData.ancestorName,
    })
    clearUploadedPhotos()
    setCurrentStep(6)
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#5D4037] mb-4">需要登录</h1>
          <p className="text-gray-600 mb-8">
            登录后才能创建寻根档案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#D35400] transition-colors"
            >
              立即登录
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 6) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-10">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">档案创建成功！</h1>
              <p className="text-green-100">您的寻根档案已保存</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => navigate('/search')}
                className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center hover:bg-blue-100 transition-colors"
              >
                <Sparkles className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <div className="font-semibold text-blue-800">浏览寻亲列表</div>
                <p className="text-sm text-blue-600">查看其他寻亲信息</p>
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-center hover:bg-amber-100 transition-colors"
              >
                <BookOpen className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <div className="font-semibold text-amber-800">返回首页</div>
                <p className="text-sm text-amber-600">查看其他功能</p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3, 4, 5].map((step) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
              currentStep > step ? 'bg-green-500 text-white' :
              currentStep === step ? 'bg-[#E67E22] text-white scale-110' :
              'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
            {step < 5 && (
              <div className={`w-16 h-1 rounded-full transition-colors ${
                currentStep > step ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-3">
                <Users className="w-7 h-7" />
                你想寻找什么？
              </h2>
              <p className="text-gray-500 mb-6">选择你的寻根目标，系统会推荐相应的策略</p>

              <div className="space-y-4">
                {searchTypeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFormData({ ...formData, searchType: option.id })}
                    className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                      formData.searchType === option.id
                        ? 'border-[#E67E22] bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.searchType === option.id ? 'bg-[#E67E22]' : 'bg-gray-200'
                      }`}>
                        <Search className={`w-6 h-6 ${formData.searchType === option.id ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg ${
                          formData.searchType === option.id ? 'text-[#E67E22]' : 'text-gray-800'
                        }`}>
                          {option.label}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-3">
                <Sparkles className="w-7 h-7" />
                你有什么线索？
              </h2>
              <p className="text-gray-500 mb-6">选择你现有的材料，每一项都可能是突破口</p>

              <div className="grid md:grid-cols-2 gap-4">
                {clueOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ 
                      ...formData, 
                      [opt.id]: !formData[opt.id as keyof typeof formData]
                    })}
                    className={`p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                      formData[opt.id as keyof typeof formData]
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <opt.icon className={`w-6 h-6 ${
                      formData[opt.id as keyof typeof formData] ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      formData[opt.id as keyof typeof formData] ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {opt.label}
                    </span>
                    {formData[opt.id as keyof typeof formData] && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-3">
                <User className="w-7 h-7" />
                祖辈基本信息
              </h2>
              <p className="text-gray-500 mb-6">填写你知道的祖辈信息，不精确也没关系</p>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      姓氏
                    </label>
                    <input
                      type="text"
                      value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      placeholder="例如: 陈、林、李"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      堂号/郡望 (如果知道)
                    </label>
                    <input
                      type="text"
                      value={formData.clanName}
                      onChange={(e) => setFormData({ ...formData, clanName: e.target.value })}
                      placeholder="例如: 颍川、西河"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      祖辈姓名
                    </label>
                    <input
                      type="text"
                      value={formData.ancestorName}
                      onChange={(e) => setFormData({ ...formData, ancestorName: e.target.value })}
                      placeholder="知道多少填多少"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      出生年份 (大约)
                    </label>
                    <input
                      type="text"
                      value={formData.ancestorBirthYear}
                      onChange={(e) => setFormData({ ...formData, ancestorBirthYear: e.target.value })}
                      placeholder="例如: 1900, 清光绪年间"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      下南洋年份
                    </label>
                    <input
                      type="text"
                      value={formData.ancestorDepartureYear}
                      onChange={(e) => setFormData({ ...formData, ancestorDepartureYear: e.target.value })}
                      placeholder="例如: 1920, 民国初年"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-semibold text-[#5D4037]">选择地区</h3>
                  <LocationSelect
                    label="祖籍地/出发地"
                    value={originLocation}
                    onChange={setOriginLocation}
                    placeholder="选择祖辈来自哪里"
                  />
                  <LocationSelect
                    label="目的地/现居地"
                    value={targetLocation}
                    onChange={setTargetLocation}
                    placeholder="选择祖辈去了哪里"
                  />
                </div>

                {formData.ancestorDepartureYear && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      📅 代际推算
                    </h4>
                    {(() => {
                      const gen = calculateGenerations();
                      if (!gen) return null;
                      return (
                        <div className="text-purple-700 text-sm space-y-2">
                          <p>距离 {formData.ancestorDepartureYear} 年已过去约 <span className="font-bold">{gen.yearsPassed}</span> 年</p>
                          <p>可能经历了约 <span className="font-bold">{gen.estimatedGen}</span> 代人</p>
                          <p>祖辈可能出生于 <span className="font-bold">{gen.birthYearRange.min}-{gen.birthYearRange.max}</span> 年</p>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-3">
                <ImageIcon className="w-7 h-7" />
                上传照片和资料
              </h2>
              <p className="text-gray-500 mb-6">上传侨批、墓碑、老照片等任何可能有帮助的材料</p>

              {uploadedPhotos.length === 0 ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#E67E22] transition-colors cursor-pointer mb-6"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">点击或拖拽上传照片</p>
                  <p className="text-sm text-gray-400">支持JPG、PNG格式，最多10张</p>
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
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-3 gap-4">
                    {uploadedPhotos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <img
                          src={photo.preview}
                          alt="uploaded"
                          className="w-full h-36 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => removeUploadedPhoto(photo.id)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-[#E67E22] hover:text-[#E67E22] transition-colors"
                  >
                    + 添加更多照片
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#5D4037] mb-3 flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  录制语音
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  可以录下长辈口述的故事，比文字更方便也更真实
                </p>
                
                <VoiceRecorder onRecordingComplete={handleVoiceRecordingComplete} />
                
                {voiceRecordings.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {voiceRecordings.map((recording) => (
                      <div key={recording.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">
                          语音记录 - {Math.floor(recording.duration / 60)}:{(recording.duration % 60).toString().padStart(2, '0')}
                        </span>
                        <button
                          onClick={() => removeVoiceRecording(recording.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          删除
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#5D4037] font-medium mb-2">
                  家族故事和其他信息
                </label>
                <textarea
                  value={formData.familyStory}
                  onChange={(e) => setFormData({ ...formData, familyStory: e.target.value })}
                  placeholder="写下你听说的家族故事，任何小事都可能是线索..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none resize-none"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7" />
                确认你的档案
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-700 mb-4">已收集信息</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {formData.searchType && (
                      <div>
                        <span className="text-gray-500">寻根目标：</span>
                        <span className="text-gray-800 ml-2">{
                          formData.searchType === 'find-china' ? '找中国祖籍' : '找南洋亲戚'
                        }</span>
                      </div>
                    )}
                    {formData.surname && (
                      <div>
                        <span className="text-gray-500">姓氏：</span>
                        <span className="text-gray-800 ml-2">{formData.surname}</span>
                      </div>
                    )}
                    {formData.clanName && (
                      <div>
                        <span className="text-gray-500">堂号：</span>
                        <span className="text-gray-800 ml-2">{formData.clanName}</span>
                      </div>
                    )}
                    {formData.ancestorName && (
                      <div>
                        <span className="text-gray-500">祖辈姓名：</span>
                        <span className="text-gray-800 ml-2">{formData.ancestorName}</span>
                      </div>
                    )}
                    {originLocation?.displayName && (
                      <div>
                        <span className="text-gray-500">祖籍地：</span>
                        <span className="text-gray-800 ml-2">{originLocation.displayName}</span>
                      </div>
                    )}
                    {targetLocation?.displayName && (
                      <div>
                        <span className="text-gray-500">目的地：</span>
                        <span className="text-gray-800 ml-2">{targetLocation.displayName}</span>
                      </div>
                    )}
                    {uploadedPhotos.length > 0 && (
                      <div>
                        <span className="text-gray-500">照片数量：</span>
                        <span className="text-gray-800 ml-2">{uploadedPhotos.length} 张</span>
                      </div>
                    )}
                    {voiceRecordings.length > 0 && (
                      <div>
                        <span className="text-gray-500">语音记录：</span>
                        <span className="text-gray-800 ml-2">{voiceRecordings.length} 条</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">线索标签：</h4>
                    <div className="flex flex-wrap gap-2">
                      {clueOptions.filter(opt => formData[opt.id as keyof typeof formData]).map(opt => (
                        <span key={opt.id} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          {opt.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">💡 下一步建议</h4>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>• 使用智能解析器分析你上传的照片和线索</li>
                    <li>• 查看知识库，学习如何寻找更多线索</li>
                    <li>• 查阅东南亚宗亲会黄页，寻找相关组织</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-8 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={currentStep > 1 ? handlePrev : () => navigate('/')}
            className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            {currentStep > 1 ? '上一步' : '返回'}
          </button>
          <button
            onClick={currentStep < 5 ? handleNext : handleSubmit}
            disabled={
              (currentStep === 1 && !formData.searchType) ||
              (currentStep === 3 && !formData.surname)
            }
            className="px-8 py-3 bg-gradient-to-r from-[#E67E22] to-amber-500 text-white rounded-xl font-semibold hover:from-[#D35400] hover:to-orange-500 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            {currentStep < 5 ? (
              <>
                下一步
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              '创建档案'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// 志愿者中心组件
const VolunteerContent: React.FC = () => {
  const navigate = useNavigate()
  const { 
    notifications, 
    posts,
    markNotificationAsRead,
    markAllAsRead,
    unreadCount
  } = useAppStore()

  const [selectedRegions, setSelectedRegions] = useState<Array<{country: Country, province?: Province, city?: City}>>([])
  const [expandedCountries, setExpandedCountries] = useState<string[]>([])
  const [expandedProvinces, setExpandedProvinces] = useState<string[]>([])

  const MAX_REGIONS = 10

  const toggleCountry = (countryId: string) => {
    setExpandedCountries(prev => 
      prev.includes(countryId)
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    )
  }

  const toggleProvince = (provinceId: string) => {
    setExpandedProvinces(prev => 
      prev.includes(provinceId)
        ? prev.filter(id => id !== provinceId)
        : [...prev, provinceId]
    )
  }

  type RegionSel = { country: Country, province?: Province, city?: City }

  // 判断 a 是否覆盖 b（a 是 b 的上级或与 b 相同）
  const covers = (a: RegionSel, b: RegionSel): boolean => {
    if (a.country.id !== b.country.id) return false
    if (!a.province) return true            // a = 整个国家，覆盖该国一切
    if (!b.province) return false           // b 是整国，a 只是省 → 不覆盖
    if (a.province.id !== b.province.id) return false
    if (!a.city) return true                // a = 整个省，覆盖该省一切
    if (!b.city) return false               // b 是整省，a 只是市 → 不覆盖
    return a.city.id === b.city.id
  }

  // 该地区自身或其上级是否已被选中（已选中则禁用，避免层级重复）
  const isRegionSelected = (country: Country, province?: Province, city?: City) => {
    const target: RegionSel = { country, province, city }
    return selectedRegions.some(region => covers(region, target))
  }

  const addRegion = (country: Country, province?: Province, city?: City) => {
    const target: RegionSel = { country, province, city }
    // 自身或上级已选，直接忽略
    if (selectedRegions.some(r => covers(r, target))) {
      return
    }
    setSelectedRegions(prev => {
      // 移除被新地区覆盖的更细级冗余项
      const pruned = prev.filter(r => !covers(target, r))
      if (pruned.length >= MAX_REGIONS) {
        alert(`最多只能添加 ${MAX_REGIONS} 个关注地区`)
        return prev
      }
      return [...pruned, target]
    })
  }

  const removeRegion = (index: number) => {
    setSelectedRegions(prev => prev.filter((_, i) => i !== index))
  }

  const getRegionDisplay = (region: {country: Country, province?: Province, city?: City}) => {
    let display = region.country.nameCn
    if (region.province) {
      display += ` - ${region.province.nameCn}`
    }
    if (region.city) {
      display += ` - ${region.city.nameCn}`
    }
    return display
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <BellRing className="w-6 h-6 text-[#E67E22]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#5D4037]">{unreadCount}</p>
              <p className="text-gray-500">待处理线索</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#5D4037]">2</p>
              <p className="text-gray-500">已协助案例</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#5D4037]">{selectedRegions.length}</p>
              <p className="text-gray-500">关注地区</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-1 flex flex-col"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-[#5D4037]" />
              <h2 className="text-lg font-bold text-[#5D4037]">
                关注地区
              </h2>
              <span className="ml-auto text-sm text-gray-500">
                {selectedRegions.length}/{MAX_REGIONS}
              </span>
            </div>

            {selectedRegions.length > 0 && (
              <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-[#5D4037] mb-2">已关注：</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map((region, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-[#E67E22] text-white rounded-full text-sm">
                      {getRegionDisplay(region)}
                      <button
                        onClick={() => removeRegion(index)}
                        className="ml-1 hover:bg-white/20 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 mb-4">
              选择你熟悉的地区，接收相关推送
            </p>

            <div className="space-y-2 flex-1 overflow-y-auto" style={{maxHeight: '360px'}}>
              {regionGroups.map(group => {
                const groupCountries = regionData.filter(c => (c.group ?? '') === group)
                if (groupCountries.length === 0) return null
                return (
                  <div key={group} className="space-y-2">
                    <div className="px-1 pt-1 text-xs font-semibold text-amber-700">{group}</div>
                    {groupCountries.map(country => (
                <div key={country.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCountry(country.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{country.nameCn}</span>
                    {expandedCountries.includes(country.id) ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {expandedCountries.includes(country.id) && (
                    <div className="p-2 bg-white border-t border-gray-100">
                      <button
                        onClick={() => addRegion(country)}
                        disabled={isRegionSelected(country)}
                        className={`w-full px-3 py-2 text-sm text-left rounded-md mb-1 transition-colors ${
                          isRegionSelected(country)
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        全部 {country.nameCn}
                      </button>

                      {country.provinces.map(province => (
                        <div key={province.id} className="ml-3">
                          <button
                            onClick={() => toggleProvince(province.id)}
                            className="w-full px-3 py-2 text-sm text-left flex items-center justify-between rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-gray-700">{province.nameCn}</span>
                            {province.cities.length > 0 && (
                              expandedProvinces.includes(province.id) ? (
                                <ChevronUp className="w-3 h-3 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-3 h-3 text-gray-400" />
                              )
                            )}
                          </button>

                          {expandedProvinces.includes(province.id) && province.cities.length > 0 && (
                            <div className="ml-3 py-1">
                              <button
                                onClick={() => addRegion(country, province)}
                                disabled={isRegionSelected(country, province)}
                                className={`w-full px-3 py-1.5 text-xs text-left rounded-md mb-1 transition-colors ${
                                  isRegionSelected(country, province)
                                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                    : 'hover:bg-gray-50 text-gray-600'
                                }`}
                              >
                                全部 {province.nameCn}
                              </button>
                              {province.cities.map(city => (
                                <button
                                  key={city.id}
                                  onClick={() => addRegion(country, province, city)}
                                  disabled={isRegionSelected(country, province, city)}
                                  className={`w-full px-3 py-1.5 text-xs text-left rounded-md mb-1 transition-colors ${
                                    isRegionSelected(country, province, city)
                                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                      : 'hover:bg-gray-50 text-gray-600'
                                  }`}
                                >
                                  {city.nameCn}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                    ))}
                  </div>
                )
              })}
            </div>

            <button className="w-full mt-4 py-3 bg-[#5D4037] text-white rounded-xl font-medium hover:bg-[#4E342E] transition-colors">
              保存设置
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2 flex flex-col"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#E67E22]" />
                <h2 className="text-lg font-bold text-[#5D4037]">
                  待处理线索
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#E67E22] hover:underline"
                >
                  全部标为已读
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <BellOff className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>暂无新线索</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => {
                      markNotificationAsRead(notification.id)
                      navigate('/search')
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      notification.isRead
                        ? 'bg-gray-50 border-gray-100'
                        : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {notification.type === 'push' ? (
                          <Bell className="w-6 h-6 text-[#E67E22]" />
                        ) : notification.type === 'message' ? (
                          <MessageCircle className="w-6 h-6 text-blue-500" />
                        ) : (
                          <Bell className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-[#5D4037]">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-[#E67E22] rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.content}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.createdAt.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto pt-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800">
                  💡 提示：当寻亲者发布信息后，系统会自动推送到这里！
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-[#5D4037] mb-6">
            我的协助案例
          </h2>
          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="font-medium text-green-800">成功案例</span>
              </div>
              <p className="text-sm text-green-700 leading-relaxed">
                帮助陈氏家族在曼谷找到失散多年的亲人
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="font-medium text-blue-800">进行中</span>
              </div>
              <p className="text-sm text-blue-700 leading-relaxed">
                协助新加坡林氏寻根问祖
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PersonalCenter
