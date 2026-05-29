import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Users, Heart, MapPin, ChevronDown, PlusCircle, UserCheck, Globe, Building2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FamilyMap } from '../components/FamilyMap';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userRole, setUserRole } = useAppStore();

  const stats = [
    { icon: Search, value: 0, label: '寻亲信息' },
    { icon: Heart, value: 0, label: '成功案例' },
    { icon: Users, value: 0, label: '活跃用户' },
    { icon: MapPin, value: 0, label: '覆盖地区' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#5D4037] via-[#795548] to-[#8D6E63] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-400 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              寻亲桥
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-2xl mx-auto">
              跨越山海，连接全球华人血脉亲情
            </p>
            
            {!userRole ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setUserRole('seeker');
                    navigate('/publish');
                  }}
                  className="px-8 py-4 bg-[#E67E22] text-white rounded-xl font-semibold text-lg hover:bg-[#D35400] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  {t('navigation.publish')}
                </button>
                <button
                  onClick={() => {
                    setUserRole('volunteer');
                    navigate('/volunteer');
                  }}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/30 transition-all shadow-lg border border-white/30 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-5 h-5" />
                  加入志愿者
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={userRole === 'seeker' ? '/publish' : '/volunteer'}
                  className="px-8 py-4 bg-[#E67E22] text-white rounded-xl font-semibold text-lg hover:bg-[#D35400] transition-all shadow-lg"
                >
                  继续{userRole === 'seeker' ? '寻亲' : '志愿'}
                </Link>
                <Link
                  to="/search"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/30 transition-all shadow-lg border border-white/30"
                >
                  {t('navigation.search')}
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="relative bg-white py-16 -mt-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
                寻亲地图
              </h2>
              <p className="text-lg text-[#8D6E63] max-w-2xl mx-auto">
                点击地图上的标记，查看各地区的寻亲信息
              </p>
            </div>
            <div className="max-w-6xl mx-auto shadow-xl">
              <FamilyMap height="600px" />
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-b from-white to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
              如何开始
            </h2>
            <p className="text-lg text-[#8D6E63]">
              简单三步，让爱团圆
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#E67E22]">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mb-3">选择角色</h3>
              <p className="text-gray-600">
                您是要寻亲，还是想作为志愿者帮助他人？
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#E67E22]">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mb-3">发布信息</h3>
              <p className="text-gray-600">
                填写您的家族故事，上传老照片，系统会智能识别位置信息
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#E67E22]">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mb-3">连接团圆</h3>
              <p className="text-gray-600">
                信息将推送给对应地区的志愿者，获得更多帮助
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#5D4037] to-[#795548] py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              让爱不再等待
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              每一条信息，都承载着一个家庭的期盼。开始您的寻亲之旅，或者成为志愿者，帮助更多家庭团圆。
            </p>
            <Link
              to="/role-selection"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E67E22] text-white rounded-xl font-semibold text-lg hover:bg-[#D35400] transition-all shadow-lg"
            >
              立即开始
              <ChevronDown size={20} className="rotate-[-90deg]" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: any; value: number; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl p-6 shadow-md border border-orange-100"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
          <Icon size={24} className="text-[#E67E22]" />
        </div>
        <span className="text-3xl font-bold text-[#5D4037]">{value}</span>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
    </motion.div>
  );
}
