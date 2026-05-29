import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Globe, Star, Award, User } from 'lucide-react';
import { mockVolunteers } from '../store/appStore';

const VolunteerListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  
  const regions = ['全部', '曼谷', '清迈', '新加坡', '吉隆坡', '雅加达', '胡志明市', '河内', '巴黎', '伦敦', '旧金山', '纽约', '北京', '上海', '广州', '汕头', '潮州'];
  
  const languageNames: Record<string, string> = {
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    'th-TH': '泰语',
    'en-US': '英语',
    'fr-FR': '法语',
    'id-ID': '印尼语',
    'vi-VN': '越南语',
    'ms-MY': '马来语',
  };

  const filteredVolunteers = mockVolunteers.filter(v => {
    const matchesSearch = !searchQuery || 
      v.name.includes(searchQuery) || 
      v.bio?.includes(searchQuery) ||
      v.languages?.some(lang => languageNames[lang]?.includes(searchQuery));
    
    const matchesRegion = !filterRegion || filterRegion === '全部' || 
      v.regions?.includes(filterRegion);
    
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
            志愿者团队
          </h1>
          <p className="text-[#8D6E63]">
            这些热心的志愿者们愿意帮助您寻找失散的亲人
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索志愿者姓名、语言或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setFilterRegion(region)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filterRegion === region
                      ? 'bg-[#E67E22] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Volunteer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer, index) => (
            <motion.div
              key={volunteer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link to={`/volunteer/${volunteer.id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-orange-50">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img
                            src={volunteer.avatar}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {volunteer.isVerified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#5D4037] mb-1">
                          {volunteer.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-orange-100 text-[#E67E22] rounded-full text-xs font-medium">
                            认证志愿者
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {volunteer.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs">
                        <Globe className="w-3 h-3" />
                        {volunteer.languages?.map(lang => languageNames[lang] || lang).join(', ')}
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-[#E67E22] rounded-xl text-xs">
                        <MapPin className="w-3 h-3" />
                        {volunteer.regions?.join(', ')}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-[#E67E22]">{volunteer.yearsOfExperience}</div>
                          <div className="text-gray-400 text-xs">年经验</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-600">{volunteer.successStories}</div>
                          <div className="text-gray-400 text-xs">成功案例</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">查看详情</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="text-center py-16">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              没有找到相关志愿者
            </h3>
            <p className="text-gray-400">
              尝试调整筛选条件
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerListPage;
