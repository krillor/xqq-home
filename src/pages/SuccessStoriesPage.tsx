import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Heart,
  Users,
  Filter,
  Award
} from 'lucide-react';

const successStories = [
  {
    id: '1',
    title: '吴迪张家族：73年寻亲路圆满',
    summary: '江苏连云港吴氏家族，跨越三代人的寻亲梦想终于实现',
    region: {
      origin: '中国江苏连云港',
      destination: '印度尼西亚',
    },
    year: '1949',
    successYear: '2024',
    duration: 73,
    generations: 3,
    photo: 'https://picsum.photos/seed/wu1/400/300',
    tags: ['江苏', '印尼', '宗族'],
    featured: true,
  },
  {
    id: '2',
    title: '潮汕陈氏家族泰国寻亲记',
    summary: '汕头陈氏家族跨越72年寻亲，终于在曼谷找到亲人',
    region: {
      origin: '广东汕头',
      destination: '泰国曼谷',
    },
    year: '1952',
    successYear: '2024',
    duration: 72,
    generations: 3,
    photo: 'https://picsum.photos/seed/chen1/400/300',
    tags: ['潮汕', '泰国', '族谱'],
    featured: true,
  },
  {
    id: '3',
    title: '新加坡李氏新加坡寻根成功',
    summary: '潮安李氏后代在新加坡成功找到宗亲',
    region: {
      origin: '广东潮安',
      destination: '新加坡',
    },
    year: '1935',
    successYear: '2023',
    duration: 88,
    generations: 4,
    photo: 'https://picsum.photos/seed/li1/400/300',
    tags: ['潮安', '新加坡', '成功'],
    featured: false,
  },
];

const SuccessStoriesPage: React.FC = () => {
  const stats = {
    totalStories: 15,
    totalSuccess: 12,
    avgDuration: 65,
    countries: 8,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-[#E67E22]" />
            <span className="text-[#E67E22] font-medium">寻亲成功案例</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
            寻亲成功故事
          </h1>
          <p className="text-lg text-[#8D6E63] max-w-2xl mx-auto">
            每一个成功案例，都是一段感人至深的故事。这些故事，见证着血浓于水的亲情
          </p>
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-[#E67E22] mb-2">{stats.totalStories}</div>
            <div className="text-gray-600">成功故事</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalSuccess}</div>
            <div className="text-gray-600">团圆家庭</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-[#5D4037] mb-2">{stats.avgDuration}</div>
            <div className="text-gray-600">平均等待(年)</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.countries}</div>
            <div className="text-gray-600">涉及国家</div>
          </div>
        </motion.div>

        {/* 筛选栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索成功故事标题、地区..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-orange-50 border border-orange-200 text-[#5D4037] rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-orange-100 transition-colors">
              <Filter className="w-4 h-4" />
                全部
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-medium">
                精选
              </button>
            </div>
          </div>
        </motion.div>

        {/* 精选案例 */}
        <div className="space-y-6 mb-10">
          <h2 className="text-2xl font-bold text-[#5D4037] flex items-center gap-2">
            <Award className="w-6 h-6 text-[#E67E22]" />
            精选案例
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.filter((s) => s.featured).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={`/success-story/${story.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative">
                      <img
                        src={story.photo}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        寻亲成功
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {story.successYear}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {story.region.origin} → {story.region.destination}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#5D4037] mb-2 line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {story.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{story.duration}年</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{story.generations}代</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {story.tags.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-orange-50 text-[#E67E22] rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 所有故事列表 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#5D4037]">
            更多成功故事
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.filter((s) => !s.featured).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={`/success-story/${story.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border-l-4 border-l-[#E67E22]">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={story.photo}
                          alt={story.title}
                          className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#5D4037] mb-1 truncate">
                            {story.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {story.region.origin} → {story.region.destination}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {story.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{story.duration}年</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{story.generations}代</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 分享您的故事 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#5D4037] to-[#E67E22] rounded-3xl p-10 text-center mt-12"
        >
          <div className="max-w-2xl mx-auto">
            <Heart className="w-16 h-16 text-white/90 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              分享您的寻亲故事
            </h2>
            <p className="text-amber-100 mb-8">
              每一个故事，都应该被记录。分享您的故事，激励更多人
            </p>
            <Link
              to="/publish"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#5D4037] rounded-full font-semibold hover:bg-amber-50 transition-all shadow-lg"
            >
              开始寻亲
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
