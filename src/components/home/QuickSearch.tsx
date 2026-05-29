import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { surnames, regions } from '@/data/mockData';

export default function QuickSearch() {
  const [selectedSurname, setSelectedSurname] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [selectedTarget, setSelectedTarget] = useState<string>('');

  const clearFilters = () => {
    setSelectedSurname('');
    setSelectedOrigin('');
    setSelectedTarget('');
  };

  const hasFilters = selectedSurname || selectedOrigin || selectedTarget;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-card rounded-2xl p-6 md:p-8 shadow-lg border border-warm-gold/20"
    >
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-2">
          快速寻亲搜索
        </h2>
        <p className="font-sans text-sm text-warm-brown/70">
          选择姓氏或地区，快速找到匹配的寻亲信息
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="font-sans text-sm font-medium text-warm-brown">
            姓氏
          </label>
          <div className="flex flex-wrap gap-2">
            {surnames.slice(0, 8).map((surname) => (
              <button
                key={surname.id}
                onClick={() => setSelectedSurname(
                  selectedSurname === surname.nameCn ? '' : surname.nameCn
                )}
                className={`px-3 py-1.5 rounded-lg font-sans text-sm transition-all ${
                  selectedSurname === surname.nameCn
                    ? 'bg-accent-orange text-white'
                    : 'bg-warm-beige text-warm-brown hover:bg-warm-gold/20'
                }`}
              >
                {surname.nameCn}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="font-sans text-sm font-medium text-warm-brown">
            出发地（潮汕地区）
          </label>
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-warm-beige text-warm-brown font-sans border border-warm-gold/20 focus:border-accent-orange focus:outline-none"
          >
            <option value="">选择地区</option>
            {regions.filter(r => ['潮州', '汕头', '揭阳', '普宁', '澄海', '潮阳', '饶平', '惠来'].includes(r.nameCn)).map((region) => (
              <option key={region.id} value={region.nameCn}>
                {region.nameCn}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="font-sans text-sm font-medium text-warm-brown">
            目的地（泰国地区）
          </label>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-warm-beige text-warm-brown font-sans border border-warm-gold/20 focus:border-accent-orange focus:outline-none"
          >
            <option value="">选择地区</option>
            {regions.filter(r => ['曼谷', '清迈', '普吉岛', '合艾', '宋卡', '春蓬'].includes(r.nameCn)).map((region) => (
              <option key={region.id} value={region.nameCn}>
                {region.nameCn}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-warm-beige text-warm-brown rounded-lg font-sans hover:bg-warm-gold/20 transition-colors"
          >
            <X size={16} />
            清除筛选
          </motion.button>
        )}
        <Link
          to={`/search?surname=${selectedSurname}&origin=${selectedOrigin}&target=${selectedTarget}`}
          className="flex items-center gap-2 px-6 py-2 bg-accent-orange text-white rounded-lg font-sans hover:bg-accent-orange/90 transition-colors shadow-md"
        >
          <Search size={16} />
          开始搜索
        </Link>
      </div>
    </motion.div>
  );
}