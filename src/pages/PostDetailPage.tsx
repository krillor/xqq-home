import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Clock, User, MessageCircle, Heart, Share2, AlertCircle } from 'lucide-react';
import { getStatusColor, getStatusText } from '../lib/utils';
import { getPostById } from '../data/postData';

interface StoryStep { title: string; body: string }

const PostDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const post = id ? getPostById(id) : undefined;

  // 从 i18n 读取本地化故事内容（若 post 提供 i18nKey）
  const localized = (() => {
    if (!post?.i18nKey) return null;
    const get = (sub: string) => t(`${post.i18nKey}.${sub}`);
    const steps = t(`${post.i18nKey}.steps`, { returnObjects: true }) as StoryStep[] | string;
    return {
      title: get('title'),
      description: get('description'),
      intro: get('intro'),
      howTitle: get('howTitle'),
      steps: Array.isArray(steps) ? steps : [],
      reflectionTitle: get('reflectionTitle'),
      reflection: get('reflection'),
      endingTitle: get('endingTitle'),
      ending: get('ending'),
      originRegion: get('originRegion'),
      targetRegion: get('targetRegion'),
      estimatedYear: get('estimatedYear'),
      seekerName: get('seekerName'),
    };
  })();

  const view = post && localized ? {
    title: localized.title || post.title,
    originRegion: localized.originRegion || post.originRegion,
    targetRegion: localized.targetRegion || post.targetRegion,
    estimatedYear: localized.estimatedYear || post.estimatedYear,
    seekerName: localized.seekerName || post.seekerName,
    description: localized.description || post.description,
  } : post;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#5D4037] hover:text-[#E67E22] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('detailPage.back')}
          </button>
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-500 mb-2">{t('detailPage.notFound')}</h2>
            <p className="text-gray-400 mb-6">{t('detailPage.notFoundDesc')}</p>
            <Link
              to="/search"
              className="inline-block px-6 py-3 bg-[#E67E22] text-white rounded-xl font-medium hover:bg-[#D35400] transition-colors"
            >
              {t('detailPage.backToList')}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#5D4037] hover:text-[#E67E22] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('detailPage.back')}
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Sample Banner */}
                {post.isSample && (
                  <div className="bg-amber-50 border-b border-amber-100 px-8 py-2 flex items-center gap-2">
                    <span className="text-amber-500 text-sm">⚠</span>
                    <span className="text-amber-600 text-sm font-medium">{t('postCard.sampleFull')}</span>
                  </div>
                )}
                {/* Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {post.surname && (
                        <span className="text-3xl font-bold text-[#E67E22]">
                          {post.surname}{t('postCard.familySuffix')}
                        </span>
                      )}
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(post.status)}`}>
                      {getStatusText(post.status, t('search.status.found'), t('search.status.searching'))}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#5D4037] mb-2">
                    {view!.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    {view!.seekerName && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{view!.seekerName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Images */}
                {post.images && post.images.length > 0 && (
                  <div className="p-8 border-b border-gray-100">
                    <h3 className="font-semibold text-[#5D4037] mb-4">{t('detailPage.photos')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {post.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${t('detailPage.photoAlt')}${index + 1}`}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Details */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-3">{t('detailPage.info')}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">{t('detailPage.origin')}</p>
                        <p className="text-[#5D4037] font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#E67E22]" />
                          {view!.originRegion}
                        </p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">{t('detailPage.destination')}</p>
                        <p className="text-[#5D4037] font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#E67E22]" />
                          {view!.targetRegion}
                        </p>
                      </div>
                      {view!.estimatedYear && (
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">{t('detailPage.era')}</p>
                          <p className="text-[#5D4037] font-medium">{view!.estimatedYear}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {localized ? (
                    <>
                      <div>
                        <p className="text-gray-600 leading-relaxed">{localized.intro}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#5D4037] mb-4 text-lg">{localized.howTitle}</h3>
                        <div className="space-y-5">
                          {localized.steps.map((step, i) => (
                            <div key={i} className="bg-amber-50/60 border border-amber-100 rounded-xl p-5">
                              <h4 className="font-semibold text-[#5D4037] mb-2">{step.title}</h4>
                              <p className="text-gray-700 leading-relaxed">{step.body}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#5D4037] mb-3">{localized.reflectionTitle}</h3>
                        <p className="text-gray-700 leading-relaxed">{localized.reflection}</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-6">
                        <h3 className="font-semibold text-[#5D4037] mb-3">{localized.endingTitle}</h3>
                        <p className="text-gray-700 italic leading-relaxed">{localized.ending}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <h3 className="font-semibold text-[#5D4037] mb-3">{t('detailPage.description')}</h3>
                      <p className="text-gray-600 leading-relaxed">{view!.description}</p>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                {!post.isSample && (
                  <div className="p-8 bg-gray-50 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 py-4 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#D35400] transition-colors flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        {t('detailPage.provideClue')}
                      </button>
                      <button className="py-4 px-6 border-2 border-[#E67E22] text-[#E67E22] rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5" />
                        {t('detailPage.favorite')}
                      </button>
                      <button className="py-4 px-6 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <Share2 className="w-5 h-5" />
                        {t('detailPage.share')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-[#5D4037] mb-4">{t('detailPage.quickActions')}</h3>
                <div className="space-y-3">
                  <Link
                    to="/search"
                    className="block w-full py-3 bg-orange-50 text-[#E67E22] rounded-xl text-center font-medium hover:bg-orange-100 transition-colors"
                  >
                    {t('detailPage.viewMore')}
                  </Link>
                  <Link
                    to="/personal?tab=archive"
                    className="block w-full py-3 bg-[#5D4037] text-white rounded-xl text-center font-medium hover:bg-[#4E342E] transition-colors"
                  >
                    {t('detailPage.alsoPublish')}
                  </Link>
                </div>
              </div>
              
              {/* Tips */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-[#5D4037] mb-3">{t('detailPage.tips')}</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• {t('detailPage.tip1')}</li>
                  <li>• {t('detailPage.tip2')}</li>
                  <li>• {t('detailPage.tip3')}</li>
                  <li>• {t('detailPage.tip4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetailPage;
