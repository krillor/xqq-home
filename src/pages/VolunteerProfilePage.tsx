import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Star, Award, User as UserIcon, Edit3, Save, X, CheckCircle } from 'lucide-react';
import { mockVolunteers, User } from '../store/appStore';

interface VolunteerProfilePageProps {
  volunteer?: User;
}

const VolunteerProfilePage: React.FC<VolunteerProfilePageProps> = ({ volunteer: externalVolunteer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<User>(
    externalVolunteer || mockVolunteers[0]
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  const languageNames: Record<string, string> = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'th-TH': 'ไทย',
    'fr-FR': 'Français',
    'en-US': 'English',
    'id-ID': 'Bahasa Indonesia',
    'vi-VN': 'Tiếng Việt',
    'ms-MY': 'Bahasa Melayu'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-br from-[#5D4037] to-[#795548] rounded-2xl mb-8"></div>
            <div className="relative -mt-20">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg p-2">
                    <img
                      src={profile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default'}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {profile.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Edit3 className="w-4 h-4 text-[#5D4037]" />
                    </button>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-[#5D4037] mb-2">
                    {profile.name}
                  </h1>
                  <p className="text-[#8D6E63] mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-[#E67E22] rounded-full text-sm font-medium">
                      <Star className="w-4 h-4" />
                      认证志愿者
                    </span>
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe className="w-5 h-5 text-[#E67E22]" />
                      <span>
                        {profile.languages?.map(lang => languageNames[lang] || lang).join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-[#E67E22]" />
                      <span>{profile.regions?.join(', ')}</span>
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#E67E22] text-white rounded-xl font-medium hover:bg-[#D35400] transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      保存
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      取消
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-md"
            >
              <div className="text-3xl font-bold text-[#E67E22] mb-1">
                {profile.yearsOfExperience || 0}
              </div>
              <div className="text-sm text-gray-500">年志愿经验</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 text-center shadow-md"
            >
              <div className="text-3xl font-bold text-green-600 mb-1">
                {profile.successStories || 0}
              </div>
              <div className="text-sm text-gray-500">成功案例</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 text-center shadow-md"
            >
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {Math.floor(Math.random() * 50) + 10}
              </div>
              <div className="text-sm text-gray-500">帮助过的家庭</div>
            </motion.div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              关于我
            </h2>
            {isEditing ? (
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors resize-none"
                placeholder="介绍一下您自己..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {profile.bio || '暂无介绍'}
              </p>
            )}
          </div>

          {/* Languages & Regions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                语言能力
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.languages?.map((lang, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium"
                  >
                    {languageNames[lang] || lang}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                关注地区
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.regions?.map((region, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-orange-50 text-[#E67E22] rounded-xl text-sm font-medium"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h2 className="text-xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              荣誉与成就
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium text-[#5D4037]">爱心大使</div>
                  <div className="text-sm text-gray-500">累计帮助超过10个家庭团聚</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-[#5D4037]">认证志愿者</div>
                  <div className="text-sm text-gray-500">通过官方认证审核</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-[#5D4037]">多语言志愿者</div>
                  <div className="text-sm text-gray-500">掌握3种以上语言</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunteerProfilePage;
