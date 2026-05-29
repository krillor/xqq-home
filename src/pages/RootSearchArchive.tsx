import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, X, Image as ImageIcon, MapPin, Calendar, 
  CheckCircle, ChevronLeft, ChevronRight, User, 
  Users, Building2, Clock, Sparkles, 
  BookOpen, FileText, Search, Mic
} from 'lucide-react'
import { useAppStore } from '../store/appStore'
import LocationSelect from '../components/LocationSelect'
import VoiceRecorder from '../components/VoiceRecorder'

const RootSearchArchive: React.FC = () => {
  const navigate = useNavigate()
  const { uploadedPhotos, addUploadedPhoto, removeUploadedPhoto, clearUploadedPhotos, addPost, isLoggedIn } = useAppStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // 基本信息
    searchType: 'find-china', // 'find-china' | 'find-overseas'
    userRole: 'grandchild',
    
    // 线索标签
    hasQiaopi: false,
    hasTombstone: false,
    knowsBirthplace: false,
    knowsDialect: false,
    hasDNA: false,
    hasFamilyTree: false,
    hasOldPhotos: false,
    
    // 人物信息
    ancestorName: '',
    ancestorBirthYear: '',
    ancestorDepartureYear: '',
    surname: '',
    clanName: '',
    
    // 代际信息
    knownGenerations: '',
    estimatedGenerations: '',
    
    // 附加信息
    familyStory: '',
    additionalNotes: '',
  })
  
  // 地区选择状态
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
  
  // 语音记录
  const [voiceRecordings, setVoiceRecordings] = useState<Array<{
    id: string;
    url: string;
    duration: number;
  }>>([])
  
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    const currentYear = 2024
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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#5D4037] mb-4">需要登录</h1>
            <p className="text-gray-600 mb-8">
              登录后才能创建寻根档案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#D35400] transition-colors"
              >
                立即登录
              </Link>
              <Link
                to="/"
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-10">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">档案创建成功！</h1>
                <p className="text-green-100">您的寻根档案已保存</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  to="/parser"
                  className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center hover:bg-blue-100 transition-colors"
                >
                  <Sparkles className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <div className="font-semibold text-blue-800">继续解析线索</div>
                  <p className="text-sm text-blue-600">使用智能解析器分析更多线索</p>
                </Link>
                <Link
                  to="/knowledge"
                  className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-center hover:bg-amber-100 transition-colors"
                >
                  <BookOpen className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                  <div className="font-semibold text-amber-800">查看知识库</div>
                  <p className="text-sm text-amber-600">学习如何寻找更多线索</p>
                </Link>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full py-4 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#D35400] transition-colors"
              >
                返回首页
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-[#5D4037] mb-4">
            创建寻根档案
          </h1>
          <p className="text-[#8D6E63] max-w-xl mx-auto text-lg">
            一步步填写你知道的信息，系统会帮你整理和分析
          </p>
        </motion.div>

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
            {/* 步骤1: 寻找目标 */}
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

            {/* 步骤2: 你有什么线索 */}
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
                  {clueOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFormData({ 
                        ...formData, 
                        [option.id]: !formData[option.id as keyof typeof formData]
                      })}
                      className={`p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        formData[option.id as keyof typeof formData]
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <option.icon className={`w-6 h-6 ${
                        formData[option.id as keyof typeof formData] ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <span className={`font-medium ${
                        formData[option.id as keyof typeof formData] ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {option.label}
                      </span>
                      {formData[option.id as keyof typeof formData] && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 步骤3: 祖辈信息 */}
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
                  
                  {/* 地区选择 */}
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
                      <div className="text-purple-700 text-sm space-y-2">
                        <p>距离 {formData.ancestorDepartureYear} 年已过去约 <span className="font-bold">{calculateGenerations()?.yearsPassed}</span> 年</p>
                        <p>可能经历了约 <span className="font-bold">{calculateGenerations()?.estimatedGen}</span> 代人</p>
                        <p>祖辈可能出生于 <span className="font-bold">{calculateGenerations()?.birthYearRange.min}-{calculateGenerations()?.birthYearRange.max}</span> 年</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 步骤4: 上传材料 */}
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

                {/* 照片上传 */}
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

                {/* 语音录制 */}
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

                {/* 家族故事 */}
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

            {/* 步骤5: 确认提交 */}
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
              {currentStep > 1 ? '上一步' : '取消'}
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
    </div>
  )
}

export default RootSearchArchive
