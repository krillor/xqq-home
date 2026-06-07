import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Bell, MapPin, CheckCircle, MessageCircle, Users, Settings, BellOff, BellRing, User } from 'lucide-react'
import { useAppStore } from '../store/appStore'

const VolunteerPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { 
    notifications, 
    posts,
    markNotificationAsRead,
    markAllAsRead,
    unreadCount
  } = useAppStore()

  const [selectedRegions, setSelectedRegions] = useState<string[]>(['曼谷', '新加坡', '槟城'])

  const allRegions = [
    '曼谷', '清迈', '普吉岛', '新加坡', '吉隆坡',
    '槟城', '雅加达', '胡志明市', '马尼拉'
  ]

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5D4037] to-[#795548] rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-2">
            {t('volunteer.title')}
          </h1>
          <p className="text-lg text-[#8D6E63]">
            {t('volunteer.welcome')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* 统计卡片 */}
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
                <p className="text-gray-500">{t('volunteer.stats.totalPushes')}</p>
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
                <p className="text-gray-500">{t('volunteer.stats.assistedCases')}</p>
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
                <p className="text-2xl font-bold text-[#5D4037]">7</p>
                <p className="text-gray-500">{t('volunteer.stats.activeDays')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 左侧：地区选择 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-[#5D4037]" />
                <h2 className="text-lg font-bold text-[#5D4037]">
                  {t('volunteer.myRegion')}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {t('volunteer.selectRegions')}
              </p>
              <div className="flex flex-wrap gap-2">
                {allRegions.map(region => (
                  <button
                    key={region}
                    onClick={() => toggleRegion(region)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedRegions.includes(region)
                        ? 'bg-[#E67E22] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-[#5D4037] text-white rounded-xl font-medium hover:bg-[#4E342E] transition-colors">
                {t('volunteer.saveSettings')}
              </button>
            </div>
          </motion.div>

          {/* 右侧：推送通知列表 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#E67E22]" />
                  <h2 className="text-lg font-bold text-[#5D4037]">
                    {t('volunteer.pendingClues')}
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
                    {t('notification.markAllRead')}
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <BellOff className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>{t('volunteer.noPush')}</p>
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

              {/* 模拟推送（方便演示） */}
              {notifications.length === 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800">
                    💡 提示：当寻亲者发布信息后，系统会自动推送到这里！现在可以先去发布页面测试一下！
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* 我的协助案例 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-bold text-[#5D4037] mb-6">
              {t('volunteer.myAssists')}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">成功案例</span>
                </div>
                <p className="text-sm text-green-700">
                  帮助陈氏家族在曼谷找到失散多年的亲人
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">进行中</span>
                </div>
                <p className="text-sm text-blue-700">
                  协助新加坡林氏寻根问祖
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VolunteerPage
