import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  X,
  Image as ImageIcon,
  MapPin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  LogIn,
  Download
} from 'lucide-react'
import { useAppStore, PhotoUpload } from '../store/appStore'
import ShareImageGenerator from '../components/ShareImageGenerator'

const PublishPage: React.FC = () => {
  const navigate = useNavigate()
  const {
    uploadedPhotos,
    addUploadedPhoto,
    removeUploadedPhoto,
    clearUploadedPhotos,
    addPost,
    userRole,
    isLoggedIn
  } = useAppStore()

  const [step, setStep] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    // 基本信息 - 联系方式是必要的
    seekerName: '',
    seekerPhone: '',
    seekerEmail: '',
    // 寻亲核心信息 - 姓氏和大概地区是重要的
    surname: '',
    originRegion: '',
    targetRegion: '',
    // 其他都是非必填
    missingPersonName: '',
    birthYear: '',
    birthPlace: '',
    hometown: '',
    departureYear: '',
    destination: '',
    familyStory: '',
    additionalInfo: '',
    seekerType: 'china-overseas' as 'china-overseas' | 'overseas-china',
    status: 'active' as 'active' | 'matched' | 'success',
  })

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    for (const file of files.slice(0, 10 - uploadedPhotos.length)) {
      const preview = URL.createObjectURL(file)
      const photoId = Date.now().toString() + Math.random().toString(36).substr(2, 9)

      const newPhoto: PhotoUpload = {
        id: photoId,
        file,
        preview,
      }

      addUploadedPhoto(newPhoto)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    for (const file of files.slice(0, 10 - uploadedPhotos.length)) {
      if (!file.type.startsWith('image/')) continue

      const preview = URL.createObjectURL(file)
      const photoId = Date.now().toString() + Math.random().toString(36).substr(2, 9)

      const newPhoto: PhotoUpload = {
        id: photoId,
        file,
        preview,
      }

      addUploadedPhoto(newPhoto)
    }
  }

  const handleSubmit = () => {
    const title = formData.surname 
      ? `${formData.surname}氏寻亲 - ${formData.originRegion || ''}→${formData.targetRegion || ''}`
      : `寻亲 - ${formData.originRegion || ''}→${formData.targetRegion || ''}`
    
    addPost({
      title,
      description: formData.familyStory || formData.additionalInfo || '',
      surname: formData.surname,
      originRegion: formData.originRegion,
      targetRegion: formData.targetRegion,
      seekerType: formData.seekerType,
      status: formData.status,
      photos: uploadedPhotos,
      createdBy: formData.seekerName || '匿名',
    })
    clearUploadedPhotos()
    setStep(3)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-10 h-10 text-[#E67E22]" />
            </div>
            <h1 className="text-3xl font-bold text-[#5D4037] mb-4">需要登录</h1>
            <p className="text-gray-600 mb-8">
              登录后才能发布寻亲信息。请先登录您的账户。
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

  if (step === 3) {
    const title = formData.surname 
      ? `${formData.surname}氏寻亲 - ${formData.originRegion || ''}→${formData.targetRegion || ''}`
      : `寻亲 - ${formData.originRegion || ''}→${formData.targetRegion || ''}`
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-10">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">发布成功！</h1>
                <p className="text-green-100">您的寻亲信息已成功发布</p>
              </div>
            </div>

            <div className="p-8">
              <ShareImageGenerator
                postData={{
                  title,
                  description: formData.familyStory || formData.additionalInfo || '',
                  surname: formData.surname,
                  originRegion: formData.originRegion,
                  targetRegion: formData.targetRegion,
                  photos: uploadedPhotos.map(p => p.preview),
                }}
              />

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  返回首页
                </button>
                <button
                  onClick={() => navigate('/search')}
                  className="py-3 bg-[#E67E22] text-white rounded-xl font-medium hover:bg-[#D35400] transition-colors"
                >
                  查看寻亲列表
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
            发布寻亲信息
          </h1>
          <p className="text-[#8D6E63] max-w-xl mx-auto">
            只需填写核心信息，其他信息可以后续补充。
            地址不需要非常精确，越详细越好，但有大概位置也能帮助找到。
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step === 1 ? 'text-[#E67E22]' : step > 1 ? 'text-green-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === 1 ? 'bg-[#E67E22] text-white' : step > 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <span className="font-medium hidden sm:inline">基本信息</span>
          </div>
          <div className={`w-16 h-1 rounded-full ${step > 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
          <div className={`flex items-center gap-2 ${step === 2 ? 'text-[#E67E22]' : step > 2 ? 'text-green-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === 2 ? 'bg-[#E67E22] text-white' : step > 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
            </div>
            <span className="font-medium hidden sm:inline">照片和详情</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  基本信息
                </h2>
                <div className="space-y-6">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <p className="text-amber-800 text-sm">
                      <span className="font-semibold">注意：</span>
                      联系方式（姓名和电话/邮箱）是必须的，其他信息可以先填写大概。
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        您的姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="请输入您的姓名"
                        value={formData.seekerName}
                        onChange={(e) => setFormData({ ...formData, seekerName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        联系电话 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="您的联系电话"
                        value={formData.seekerPhone}
                        onChange={(e) => setFormData({ ...formData, seekerPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      邮箱 <span className="text-gray-400">(选填)</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                      placeholder="您的邮箱地址"
                      value={formData.seekerEmail}
                      onChange={(e) => setFormData({ ...formData, seekerEmail: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        姓氏 <span className="text-gray-400">(选填，建议填写)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="例如：陈、李、张"
                        value={formData.surname}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        被寻者姓名 <span className="text-gray-400">(选填)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="被寻找的亲人姓名"
                        value={formData.missingPersonName}
                        onChange={(e) => setFormData({ ...formData, missingPersonName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        祖籍/出发地 <span className="text-gray-400">(选填，地址不用太精确)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="例如：广东、潮汕、福建、浙江等"
                        value={formData.originRegion}
                        onChange={(e) => setFormData({ ...formData, originRegion: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        目的地 <span className="text-gray-400">(选填，地址不用太精确)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="例如：泰国、新加坡、马来西亚、美国等"
                        value={formData.targetRegion}
                        onChange={(e) => setFormData({ ...formData, targetRegion: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#5D4037] font-medium mb-2">
                      寻亲方向
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, seekerType: 'china-overseas' })}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.seekerType === 'china-overseas'
                            ? 'border-[#E67E22] bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-[#5D4037]">中国→海外</div>
                        <div className="text-sm text-gray-500 mt-1">从中国前往海外的亲人</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, seekerType: 'overseas-china' })}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.seekerType === 'overseas-china'
                            ? 'border-[#E67E22] bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-[#5D4037]">海外→中国</div>
                        <div className="text-sm text-gray-500 mt-1">从海外回到中国寻根</div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  照片和详情补充
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#5D4037] font-medium mb-3">
                      上传照片
                      <span className="text-sm text-gray-500 ml-2">
                        (选填，最多10张)
                      </span>
                    </label>
                    
                    {uploadedPhotos.length < 10 && (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#E67E22] transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          点击或拖拽上传照片
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          支持JPG、PNG格式
                        </p>
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
                    
                    {uploadedPhotos.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-6">
                        {uploadedPhotos.map((photo) => (
                          <div key={photo.id} className="relative group">
                            <img
                              src={photo.preview}
                              alt="upload"
                              className="w-full h-20 object-cover rounded-xl"
                            />
                            <button
                              onClick={() => removeUploadedPhoto(photo.id)}
                              className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        出生年份 <span className="text-gray-400">(选填)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="例如：1930、1945等"
                        value={formData.birthYear}
                        onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[#5D4037] font-medium mb-2">
                        离开年份 <span className="text-gray-400">(选填)</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors"
                        placeholder="大概离开时间"
                        value={formData.departureYear}
                        onChange={(e) => setFormData({ ...formData, departureYear: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      家族故事 <span className="text-gray-400">(选填)</span>
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors resize-none"
                      rows={5}
                      placeholder="请讲述您知道的家族故事...任何线索都可能帮助您找到亲人"
                      value={formData.familyStory}
                      onChange={(e) => setFormData({ ...formData, familyStory: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[#5D4037] font-medium mb-2">
                      其他补充信息 <span className="text-gray-400">(选填)</span>
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#E67E22] focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="其他需要说明的事项..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-8 border-t border-gray-100 flex justify-between">
            <button
              onClick={step > 1 ? () => setStep(step - 1) : () => navigate('/')}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              {step > 1 ? '上一步' : '取消'}
            </button>
            <button
              onClick={step < 2 ? () => setStep(step + 1) : handleSubmit}
              disabled={step === 1 && (!formData.seekerName || !formData.seekerPhone)}
              className="px-8 py-3 bg-gradient-to-r from-[#E67E22] to-amber-500 text-white rounded-xl font-semibold hover:from-[#D35400] hover:to-orange-500 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step < 2 ? (
                <>
                  下一步
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                '发布信息'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublishPage
