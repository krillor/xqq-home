import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Heart,
  Award,
  Users,
  BookOpen,
  Image,
  Clock,
  CheckCircle
} from 'lucide-react';

const successStories = [
  {
    id: '1',
    title: '吴迪张家族寻亲成功案例',
    summary: '跨越73年，三代人的寻亲之路终于圆满',
    region: {
      origin: '中国江苏连云港',
      destination: '印度尼西亚',
    },
    timeline: [
      { year: '1949', event: '吴迪张赴印尼谋生', description: '因战乱与家乡失去联系' },
      { year: '1980', event: '寄回家书和照片', description: '成为唯一的念想' },
      { year: '2024', event: '子孙发起寻亲', description: '通过寻亲平台发布信息' },
      { year: '2024', event: '成功团聚', description: '找到家乡亲人' },
    ],
    content: {
      background: '1920年，吴迪张出生于江苏连云港浦南镇。1949年，因战乱他赴印尼谋生，此后与家乡彻底失去联系。他在印尼娶妻生子，有了三个孩子，但对家乡的思念从未停止。1980年，他寄出了最后一封信和一张全家福照片，这成为了与家乡唯一的联系纽带。',
      familyStories: [
        '吴迪张在印尼时常说起家乡',
        '子孙后代始终记得根在中国',
        '一张老照片成为唯一的念想',
      ],
      findingProcess: [
        '在寻亲平台发布信息',
        'AI识别照片中的信息',
        '匹配到连云港地区',
        '联系当地侨联协助',
        '确认浦南镇吴氏宗族',
        'DNA比对成功',
      ],
      reunion: '2024年的一天，当确认找到亲人的那一刻，整个家族都沸腾了。虽然吴迪张老人已经不在，但他的子孙终于找到了家乡的根，圆了他老人家未完成的心愿。',
    },
    photos: [
      {
        url: 'https://picsum.photos/seed/oldphoto1/600/400',
        caption: '1980年，吴迪张从印尼寄回的全家福',
      },
      {
        url: 'https://picsum.photos/seed/reunion/600/400',
        caption: '2024年，吴迪张的后代与家乡亲人团聚',
      },
    ],
    stats: {
      yearsSearching: 73,
      generations: 3,
      countriesInvolved: 2,
    },
    impact: '这个案例证明了，无论时间过去多久，血脉亲情永远不会断裂。',
  },
  {
    id: '2',
    title: '潮汕陈氏家族泰国寻亲记',
    summary: '历时18个月，终于找到爷爷的下落',
    region: {
      origin: '广东汕头',
      destination: '泰国曼谷',
    },
    timeline: [
      { year: '1952', event: '陈木水赴泰国', description: '孤身一人闯荡东南亚' },
      { year: '1965', event: '最后一次通信', description: '寄回一张照片' },
      { year: '2023', event: '发布寻亲信息', description: '孙子踏上寻亲路' },
      { year: '2024', event: '曼谷团聚', description: '找到父亲的兄弟姐妹' },
    ],
    content: {
      background: '1952年，28岁的陈木水告别妻子和年幼的儿子，从汕头出发前往泰国。最初还有书信往来，后来随着时间推移和时局变化，逐渐失去了联系。',
      familyStories: [
        '奶奶常常讲起爷爷的故事',
        '父亲一生最大的遗憾',
        '我们一定要找到爷爷',
      ],
      findingProcess: [
        '寻亲平台发布信息',
        '志愿者协助翻译',
        '泰国侨胞帮忙',
        '找到当年同乡',
        '确认爷爷消息',
      ],
      reunion: '虽然爷爷已经去世，但我们找到了他在泰国的后代。当我们在曼谷见到他们的那一刻，激动的心情无法用言语形容。',
    },
    photos: [
      {
        url: 'https://picsum.photos/seed/chen1/600/400',
        caption: '爷爷1950年代的照片',
      },
      {
        url: 'https://picsum.photos/seed/chen2/600/400',
        caption: '曼谷相见的感人瞬间',
      },
    ],
    stats: {
      yearsSearching: 72,
      generations: 3,
      countriesInvolved: 2,
    },
    impact: '两个家庭重新连接，血脉亲情跨越了三代人。',
  },
];

const SuccessStoryDetailPage: React.FC = () => {
  const { id } = useParams();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const story = successStories.find((s) => s.id === id) || successStories[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* 导航栏 */}
        <div className="mb-8">
          <Link
            to="/success-stories"
            className="inline-flex items-center gap-2 text-[#5D4037] hover:text-[#E67E22] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回成功故事</span>
          </Link>
        </div>

        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-[#5D4037] to-amber-700 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-4 py-1 bg-green-500 text-white rounded-full text-sm font-medium mb-4">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  寻亲成功
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {story.title}
                </h1>
                <p className="text-amber-100 text-lg">{story.summary}</p>
              </div>
              <div className="flex items-center gap-6 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold">{story.stats.yearsSearching}</div>
                  <div className="text-sm opacity-80">年寻找</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{story.stats.generations}</div>
                  <div className="text-sm opacity-80">代人</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{story.stats.countriesInvolved}</div>
                  <div className="text-sm opacity-80">国家</div>
                </div>
              </div>
            </div>
          </div>

          {/* 照片轮播 */}
          <div className="p-8 border-b border-gray-100">
            <div className="relative">
              <img
                src={story.photos[currentPhotoIndex].url}
                alt={story.photos[currentPhotoIndex].caption}
                className="w-full max-h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {story.photos[currentPhotoIndex].caption}
              </div>
              {story.photos.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {story.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPhotoIndex ? 'bg-[#E67E22] w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 时间线 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                寻亲时间线
              </h2>
              <div className="relative">
                {/* 时间线连接线 */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-200" />

                <div className="space-y-8">
                  {story.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-16"
                    >
                      <div className="absolute left-4 w-5 h-5 bg-[#E67E22] rounded-full border-4 border-white shadow-lg" />
                      <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#E67E22] font-bold text-xl">{item.year}</span>
                          <span className="text-[#5D4037] font-semibold">{item.event}</span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 故事内容 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-[#5D4037] mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                寻亲故事
              </h2>

              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-[#5D4037] mb-3">背景故事</h3>
                  <p className="text-gray-600 leading-relaxed">{story.content.background}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-[#5D4037] mb-3">家族的记忆</h3>
                  <div className="bg-amber-50 border-l-4 border-[#E67E22] p-5 rounded-r-xl">
                    <ul className="space-y-2">
                      {story.content.familyStories.map((storyItem, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Heart className="w-5 h-5 text-[#E67E22] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{storyItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-[#5D4037] mb-3">寻亲过程</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {story.content.findingProcess.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg"
                      >
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-sm flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-[#5D4037] mb-3">团圆时刻</h3>
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <p className="text-gray-700 leading-relaxed italic">
                      "{story.content.reunion}"
                    </p>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 地区信息 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-[#5D4037] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                寻亲地区
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">出发地</div>
                  <div className="font-semibold text-[#5D4037]">{story.region.origin}</div>
                </div>
                <div className="text-center text-gray-400">
                  <span className="text-2xl">↓</span>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">目的地</div>
                  <div className="font-semibold text-[#5D4037]">{story.region.destination}</div>
                </div>
              </div>
            </motion.div>

            {/* 快速操作 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-[#5D4037] mb-4">我也要寻亲</h3>
              <div className="space-y-3">
                <Link
                  to="/publish"
                  className="block w-full py-3 bg-[#E67E22] text-white rounded-xl text-center font-medium hover:bg-[#D35400] transition-colors"
                >
                  发布寻亲信息
                </Link>
                <Link
                  to="/volunteers"
                  className="block w-full py-3 border-2 border-[#5D4037] text-[#5D4037] rounded-xl text-center font-medium hover:bg-orange-50 transition-colors"
                >
                  寻找志愿者
                </Link>
              </div>
            </motion.div>

            {/* 影响与启示 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
            >
              <h3 className="font-semibold text-[#5D4037] mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                故事的意义
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{story.impact}</p>
            </motion.div>
          </div>
        </div>

        {/* 其他成功案例 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-[#5D4037] mb-6">其他成功案例</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.filter((s) => s.id !== story.id).map((item) => (
              <Link
                key={item.id}
                to={`/success-story/${item.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.photos[0].url}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-[#5D4037] mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessStoryDetailPage;
