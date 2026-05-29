import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Users, Heart, MapPin, Globe, MessageCircle, Search } from 'lucide-react'
import { useAppStore } from '../store/appStore'

const RoleSelectionPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setUserRole = useAppStore((state) => state.setUserRole)

  const handleRoleSelect = (role: 'seeker' | 'volunteer') => {
    setUserRole(role)
    if (role === 'seeker') {
      navigate('/publish')
    } else {
      navigate('/volunteer')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5D4037] mb-4">
            {t('roleSelection.title')}
          </h1>
          <p className="text-xl text-[#8D6E63] max-w-2xl mx-auto">
            {t('roleSelection.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 寻亲者卡片 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#E67E22]"
            onClick={() => handleRoleSelect('seeker')}
          >
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-8 text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-center">
                {t('roleSelection.seeker')}
              </h2>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-[#E67E22] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#5D4037]">
                      {t('roleSelection.seekerFeature1Title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('roleSelection.seekerFeature1')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#E67E22] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#5D4037]">
                      {t('roleSelection.seekerFeature2Title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('roleSelection.seekerFeature2')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-[#E67E22] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#5D4037]">
                      {t('roleSelection.seekerFeature3Title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('roleSelection.seekerFeature3')}
                    </p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#E67E22] to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-[#D35400] hover:to-orange-500 transition-all shadow-lg">
                {t('roleSelection.selectSeeker')}
              </button>
            </div>
          </motion.div>

          {/* 志愿者卡片 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#5D4037]"
            onClick={() => handleRoleSelect('volunteer')}
          >
            <div className="bg-gradient-to-br from-[#5D4037] to-[#795548] p-8 text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-center">
                {t('roleSelection.volunteer')}
              </h2>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-[#5D4037] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#5D4037]">
                      {t('roleSelection.volunteerFeature1Title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('roleSelection.volunteerFeature1')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#5D4037] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#5D4037]">
                      {t('roleSelection.volunteerFeature2Title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('roleSelection.volunteerFeature2')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-[#5D4037] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#5D4037]">
                      {t('roleSelection.volunteerFeature3Title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('roleSelection.volunteerFeature3')}
                    </p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#5D4037] to-[#795548] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#4E342E] hover:to-[#6D4C41] transition-all shadow-lg">
                {t('roleSelection.selectVolunteer')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RoleSelectionPage
