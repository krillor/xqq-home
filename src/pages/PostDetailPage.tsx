import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, User, MessageCircle, Heart, Share2, AlertCircle } from 'lucide-react';
import CommentsSection from '../components/CommentsSection';
import { getPostById } from '../data/postData';

const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = id ? getPostById(id) : undefined;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return '已找到';
      default: return '寻找中';
    }
  };
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#5D4037] hover:text-[#E67E22] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-500 mb-2">信息未找到</h2>
            <p className="text-gray-400 mb-6">该寻亲信息可能已被删除或不存在</p>
            <Link
              to="/search"
              className="inline-block px-6 py-3 bg-[#E67E22] text-white rounded-xl font-medium hover:bg-[#D35400] transition-colors"
            >
              返回寻亲列表
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
            返回
          </button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-[#E67E22]">
                        {post.surname}氏
                      </span>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#5D4037] mb-2">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.seekerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Images */}
                {post.images && post.images.length > 0 && (
                  <div className="p-8 border-b border-gray-100">
                    <h3 className="font-semibold text-[#5D4037] mb-4">相关照片</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {post.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`照片${index + 1}`}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Details */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-3">寻亲信息</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">出发地</p>
                        <p className="text-[#5D4037] font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#E67E22]" />
                          {post.originRegion}
                        </p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">目的地</p>
                        <p className="text-[#5D4037] font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#E67E22]" />
                          {post.targetRegion}
                        </p>
                      </div>
                      {post.estimatedYear && (
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">年代</p>
                          <p className="text-[#5D4037] font-medium">{post.estimatedYear}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[#5D4037] mb-3">详细描述</h3>
                    <p className="text-gray-600 leading-relaxed">{post.description}</p>
                  </div>
                  
                  {post.familyStory && (
                    <div>
                      <h3 className="font-semibold text-[#5D4037] mb-3">家族故事</h3>
                      <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
                        <p className="text-gray-700 italic leading-relaxed">
                          "{post.familyStory}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="p-8 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-4 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#D35400] transition-colors flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      提供线索
                    </button>
                    <button className="py-4 px-6 border-2 border-[#E67E22] text-[#E67E22] rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      收藏
                    </button>
                    <button className="py-4 px-6 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" />
                      分享
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-[#5D4037] mb-4">快速操作</h3>
                <div className="space-y-3">
                  <Link
                    to="/search"
                    className="block w-full py-3 bg-orange-50 text-[#E67E22] rounded-xl text-center font-medium hover:bg-orange-100 transition-colors"
                  >
                    查看更多寻亲信息
                  </Link>
                  <Link
                    to="/publish"
                    className="block w-full py-3 bg-[#5D4037] text-white rounded-xl text-center font-medium hover:bg-[#4E342E] transition-colors"
                  >
                    我也来发布
                  </Link>
                </div>
              </div>
              
              {/* Tips */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-[#5D4037] mb-3">温馨提示</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 注意保护个人隐私</li>
                  <li>• 提供线索前请核实信息</li>
                  <li>• 涉及金钱交易请谨慎</li>
                  <li>• 联系当地侨团组织可获得更多帮助</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 mt-8"
          >
            <CommentsSection postId={id || '1'} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetailPage;
