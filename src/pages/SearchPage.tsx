import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon } from 'lucide-react';
import LocationSelect from '../components/LocationSelect';
import PostCard from '../components/PostCard';
import { getStatusText } from '../lib/utils';
import { allPosts } from '../data/postData';

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [filterRegion] = useState<string>(searchParams.get('region') || '');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<{
    countryId?: string;
    provinceId?: string;
    cityId?: string;
    displayName?: string;
  }>();
  
  // Filter posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesLocation = !selectedLocation?.displayName || 
        post.originRegion.includes(selectedLocation.displayName) ||
        post.targetRegion.includes(selectedLocation.displayName);
      
      const matchesStatus = !filterStatus || post.status === filterStatus;
      
      const matchesSearch = !searchQuery || 
        post.title.includes(searchQuery) || 
        post.surname.includes(searchQuery) ||
        post.description.includes(searchQuery);
      
      return matchesLocation && matchesStatus && matchesSearch;
    });
  }, [selectedLocation, filterStatus, searchQuery]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4">
            {t('search.pageTitle')}
          </h1>
          <p className="text-[#8D6E63]">
            {t('search.subtitle')}
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('search.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <LocationSelect
                  placeholder={t('search.filterRegion')}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors"
                >
                  <option value="">{t('search.allStatus')}</option>
                  <option value="active">{t('search.status.searching')}</option>
                  <option value="success">{t('search.status.found')}</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* List View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#5D4037]">
              {selectedLocation?.displayName
                ? `${selectedLocation.displayName}${t('search.regionPostsSuffix')}`
                : t('search.allPosts')
              }
              <span className="ml-2 text-[#E67E22]">({filteredPosts.length})</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                index={index}
                foundLabel={t('search.status.found')}
                searchingLabel={t('search.status.searching')}
                viewDetailLabel={`${t('search.viewDetail')} →`}
              />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                {t('search.noResults')}
              </h3>
              <p className="text-gray-400">
                {t('search.noResultsHint')}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;
