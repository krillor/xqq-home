import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Users, Heart, MapPin, ChevronDown, PlusCircle, UserCheck } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userRole, setUserRole } = useAppStore();

  const stats = [
    { icon: Search, value: 1240, label: t('home.stats.totalPosts') },
    { icon: Heart, value: 89, label: t('home.stats.success') },
    { icon: Users, value: 3600, label: t('home.stats.activeSeekers') },
    { icon: MapPin, value: 12, label: t('home.stats.regions') },
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
              {t('brand')}
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-2xl mx-auto">
              {t('home.heroSlogan')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => { setUserRole('seeker'); navigate('/personal?tab=archive'); }}
                className="px-8 py-4 bg-[#E67E22] text-white rounded-xl font-semibold text-lg hover:bg-[#D35400] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                {t('navigation.publish')}
              </button>
              <button
                onClick={() => { setUserRole('volunteer'); navigate('/personal?tab=volunteer'); }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/30 transition-all shadow-lg border border-white/30 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-5 h-5" />
                {t('home.joinVolunteer')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-white py-16 -mt-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
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
              {t('home.howTitle')}
            </h2>
            <p className="text-lg text-[#8D6E63]">
              {t('home.howSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg h-full"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#E67E22]">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mb-3">{t('home.step1Title')}</h3>
              <p className="text-gray-600">
                {t('home.step1Desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg h-full"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#E67E22]">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mb-3">{t('home.step2Title')}</h3>
              <p className="text-gray-600">
                {t('home.step2Desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg h-full"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#E67E22]">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mb-3">{t('home.step3Title')}</h3>
              <p className="text-gray-600">
                {t('home.step3Desc')}
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
              {t('home.ctaTitle')}
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              {t('home.ctaDesc')}
            </p>
            <Link
              to="/personal"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E67E22] text-white rounded-xl font-semibold text-lg hover:bg-[#D35400] transition-all shadow-lg"
            >
              {t('home.ctaButton')}
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
