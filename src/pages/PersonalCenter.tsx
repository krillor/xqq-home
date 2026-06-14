import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, X, Image as ImageIcon, MapPin,
  CheckCircle, ChevronLeft, ChevronRight, User,
  Users, Building2, Clock, Sparkles,
  BookOpen, FileText, Search, Mic
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/appStore'
import LocationSelect from '../components/LocationSelect'
import VoiceRecorder from '../components/VoiceRecorder'

const PersonalCenter: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-2">{t('personal.title')}</h1>
          <p className="text-[#8D6E63]">{t('personal.archiveIntro')}</p>
        </motion.div>

        <RootSearchArchiveContent />
      </div>
    </div>
  )
}

// 寻根档案组件
const RootSearchArchiveContent: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { uploadedPhotos, addUploadedPhoto, removeUploadedPhoto, clearUploadedPhotos } = useAppStore()
  
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
    { id: 'find-china', label: t('personal.searchTypeChina'), description: t('personal.searchTypeChinaDesc') },
    { id: 'find-overseas', label: t('personal.searchTypeOverseas'), description: t('personal.searchTypeOverseasDesc') },
  ]

  const clueOptions = [
    { id: 'hasQiaopi', label: t('personal.clueQiaopi'), icon: FileText },
    { id: 'hasTombstone', label: t('personal.clueTombstone'), icon: Building2 },
    { id: 'knowsBirthplace', label: t('personal.clueBirthplace'), icon: MapPin },
    { id: 'knowsDialect', label: t('personal.clueDialect'), icon: Search },
    { id: 'hasDNA', label: t('personal.clueDNA'), icon: Sparkles },
    { id: 'hasFamilyTree', label: t('personal.clueFamilyTree'), icon: BookOpen },
    { id: 'hasOldPhotos', label: t('personal.clueOldPhotos'), icon: ImageIcon },
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

  const buildArchive = () => {
    const originDisplay = originLocation?.displayName || t('personal.unknown')
    const targetDisplay = targetLocation?.displayName || t('personal.unknown')
    const clueTags = clueOptions
      .filter(opt => formData[opt.id as keyof typeof formData])
      .map(opt => opt.label)
    return {
      savedAt: new Date().toISOString(),
      searchType: formData.searchType,
      surname: formData.surname,
      clanName: formData.clanName,
      ancestorName: formData.ancestorName,
      ancestorBirthYear: formData.ancestorBirthYear,
      ancestorDepartureYear: formData.ancestorDepartureYear,
      origin: originDisplay,
      target: targetDisplay,
      familyStory: formData.familyStory,
      additionalNotes: formData.additionalNotes,
      clues: clueTags,
      photoCount: uploadedPhotos.length,
    }
  }

  const exportArchive = () => {
    const data = JSON.stringify(buildArchive(), null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `roots-archive-${formData.surname || 'archive'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSubmit = () => {
    // 仅保存在用户本地浏览器，平台不持有任何数据
    try {
      localStorage.setItem('rootsArchive', JSON.stringify(buildArchive()))
    } catch (e) {
      // localStorage 不可用时忽略，仍可导出
    }
    clearUploadedPhotos()
    setCurrentStep(6)
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
              <h1 className="text-2xl font-bold text-white mb-2">{t('personal.archiveCreated')}</h1>
              <p className="text-green-100">{t('personal.archiveSavedLocal')}</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <button
              onClick={exportArchive}
              className="w-full p-5 bg-[#E67E22] text-white rounded-xl text-center font-semibold hover:bg-[#D35400] transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5 rotate-180" />
              {t('personal.exportArchive')}
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => navigate('/decode')}
                className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center hover:bg-blue-100 transition-colors"
              >
                <Sparkles className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <div className="font-semibold text-blue-800">{t('navigation.decode')}</div>
                <p className="text-sm text-blue-600">{t('tools.subtitle')}</p>
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-center hover:bg-amber-100 transition-colors"
              >
                <BookOpen className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <div className="font-semibold text-amber-800">{t('personal.backHome')}</div>
                <p className="text-sm text-amber-600">{t('personal.backHomeDesc')}</p>
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
                {t('personal.step1Title')}
              </h2>
              <p className="text-gray-500 mb-6">{t('personal.step1Desc')}</p>

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
                {t('personal.step2Title')}
              </h2>
              <p className="text-gray-500 mb-6">{t('personal.step2Desc')}</p>

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

              <button
                type="button"
                onClick={() => navigate('/decode')}
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#E67E22] hover:text-[#D35400] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {t('personal.decodeHint')} →
              </button>
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
                {t('personal.step3Title')}
              </h2>
              <p className="text-gray-500 mb-6">{t('personal.step3Desc')}</p>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      {t('personal.surname')}
                    </label>
                    <input
                      type="text"
                      value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      placeholder={t('personal.surnamePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      {t('personal.clanName')}
                    </label>
                    <input
                      type="text"
                      value={formData.clanName}
                      onChange={(e) => setFormData({ ...formData, clanName: e.target.value })}
                      placeholder={t('personal.clanPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      {t('personal.ancestorName')}
                    </label>
                    <input
                      type="text"
                      value={formData.ancestorName}
                      onChange={(e) => setFormData({ ...formData, ancestorName: e.target.value })}
                      placeholder={t('personal.ancestorNamePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      {t('personal.birthYear')}
                    </label>
                    <input
                      type="text"
                      value={formData.ancestorBirthYear}
                      onChange={(e) => setFormData({ ...formData, ancestorBirthYear: e.target.value })}
                      placeholder={t('personal.birthYearPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      {t('personal.departureYear')}
                    </label>
                    <input
                      type="text"
                      value={formData.ancestorDepartureYear}
                      onChange={(e) => setFormData({ ...formData, ancestorDepartureYear: e.target.value })}
                      placeholder={t('personal.departureYearPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-semibold text-[#5D4037]">{t('personal.selectRegionTitle')}</h3>
                  <LocationSelect
                    label={t('personal.originLabel')}
                    value={originLocation}
                    onChange={setOriginLocation}
                    placeholder={t('personal.originPlaceholder')}
                  />
                  <LocationSelect
                    label={t('personal.targetLabel')}
                    value={targetLocation}
                    onChange={setTargetLocation}
                    placeholder={t('personal.targetPlaceholder')}
                  />
                </div>

                {formData.ancestorDepartureYear && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      📅 {t('personal.genTitle')}
                    </h4>
                    {(() => {
                      const gen = calculateGenerations();
                      if (!gen) return null;
                      return (
                        <div className="text-purple-700 text-sm space-y-2">
                          <p>{t('personal.genYearsPassed', { year: formData.ancestorDepartureYear, years: gen.yearsPassed })}</p>
                          <p>{t('personal.genGenerations', { gen: gen.estimatedGen })}</p>
                          <p>{t('personal.genBirthRange', { min: gen.birthYearRange.min, max: gen.birthYearRange.max })}</p>
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
                {t('personal.step4Title')}
              </h2>
              <p className="text-gray-500 mb-6">{t('personal.step4Desc')}</p>

              {uploadedPhotos.length === 0 ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#E67E22] transition-colors cursor-pointer mb-6"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">{t('personal.uploadClick')}</p>
                  <p className="text-sm text-gray-400">{t('personal.uploadFormat')}</p>
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
                    {t('personal.addMorePhotos')}
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
                  {t('personal.voiceTitle')}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {t('personal.voiceDesc')}
                </p>
                
                <VoiceRecorder onRecordingComplete={handleVoiceRecordingComplete} />
                
                {voiceRecordings.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {voiceRecordings.map((recording) => (
                      <div key={recording.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">
                          {t('personal.voiceItem')} - {Math.floor(recording.duration / 60)}:{(recording.duration % 60).toString().padStart(2, '0')}
                        </span>
                        <button
                          onClick={() => removeVoiceRecording(recording.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          {t('personal.delete')}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#5D4037] font-medium mb-2">
                  {t('personal.storyLabel')}
                </label>
                <textarea
                  value={formData.familyStory}
                  onChange={(e) => setFormData({ ...formData, familyStory: e.target.value })}
                  placeholder={t('personal.storyPlaceholder')}
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
                {t('personal.step5Title')}
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-700 mb-4">{t('personal.collectedInfo')}</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {formData.searchType && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldGoal')}：</span>
                        <span className="text-gray-800 ml-2">{
                          formData.searchType === 'find-china' ? t('personal.goalChina') : t('personal.goalOverseas')
                        }</span>
                      </div>
                    )}
                    {formData.surname && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldSurname')}：</span>
                        <span className="text-gray-800 ml-2">{formData.surname}</span>
                      </div>
                    )}
                    {formData.clanName && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldClan')}：</span>
                        <span className="text-gray-800 ml-2">{formData.clanName}</span>
                      </div>
                    )}
                    {formData.ancestorName && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldAncestor')}：</span>
                        <span className="text-gray-800 ml-2">{formData.ancestorName}</span>
                      </div>
                    )}
                    {originLocation?.displayName && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldOrigin')}：</span>
                        <span className="text-gray-800 ml-2">{originLocation.displayName}</span>
                      </div>
                    )}
                    {targetLocation?.displayName && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldTarget')}：</span>
                        <span className="text-gray-800 ml-2">{targetLocation.displayName}</span>
                      </div>
                    )}
                    {uploadedPhotos.length > 0 && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldPhotos')}：</span>
                        <span className="text-gray-800 ml-2">{uploadedPhotos.length} {t('personal.photosUnit')}</span>
                      </div>
                    )}
                    {voiceRecordings.length > 0 && (
                      <div>
                        <span className="text-gray-500">{t('personal.fieldVoice')}：</span>
                        <span className="text-gray-800 ml-2">{voiceRecordings.length} {t('personal.voiceUnit')}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">{t('personal.clueTags')}：</h4>
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
                  <h4 className="font-semibold text-blue-800 mb-3">💡 {t('personal.nextSuggestions')}</h4>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>• {t('personal.suggestion1')}</li>
                    <li>• {t('personal.suggestion2')}</li>
                    <li>• {t('personal.suggestion3')}</li>
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
            {currentStep > 1 ? t('personal.prev') : t('personal.back')}
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
                {t('personal.next')}
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              t('personal.createArchive')
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalCenter
