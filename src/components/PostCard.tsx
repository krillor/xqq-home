import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock } from 'lucide-react';
import { getStatusColor, getStatusText } from '../lib/utils';
import type { PostData } from '../data/postData';


interface PostCardProps {
  post: PostData;
  index?: number;
  foundLabel?: string;
  searchingLabel?: string;
  viewDetailLabel?: string;
}

export default function PostCard({
  post,
  index = 0,
  foundLabel,
  searchingLabel,
  viewDetailLabel,
}: PostCardProps) {
  const { t } = useTranslation();
  foundLabel = foundLabel ?? t('search.status.found');
  searchingLabel = searchingLabel ?? t('search.status.searching');
  viewDetailLabel = viewDetailLabel ?? `${t('search.viewDetail')} →`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link to={`/detail/${post.id}`} className="block h-full">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-orange-50 h-full flex flex-col">
          {post.isSample && (
            <div className="bg-amber-50 border-b border-amber-100 px-4 py-1.5 flex items-center gap-1.5">
              <span className="text-amber-500 text-xs">⚠</span>
              <span className="text-amber-600 text-xs font-medium">{t('postCard.sample')}</span>
            </div>
          )}
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-3">
              {post.surname ? (
                <span className="text-2xl font-bold text-[#E67E22]">
                  {post.surname}{t('postCard.familySuffix')}
                </span>
              ) : (
                <span className="text-base font-bold text-[#5D4037] line-clamp-1">
                  {post.originRegion} → {post.targetRegion}
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                {getStatusText(post.status, foundLabel, searchingLabel)}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#5D4037] mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.description}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-start gap-1">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{post.originRegion} → {post.targetRegion}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 px-6 py-3 border-t border-orange-100">
            <span className="text-[#E67E22] font-medium text-sm">
              {viewDetailLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
