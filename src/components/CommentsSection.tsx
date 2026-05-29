import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image, Heart, X, ThumbsUp, User, LogIn } from 'lucide-react';
import { useAppStore, Comment } from '../store/appStore';
import { Link } from 'react-router-dom';

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const { comments, addComment, likeComment, getCommentsByPostId, isLoggedIn, currentUser } = useAppStore();
  const [content, setContent] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postComments = getCommentsByPostId(postId);

  const handleSubmit = () => {
    if (!isLoggedIn) return;
    if (!content.trim() && uploadedImages.length === 0) return;
    
    addComment({
      postId,
      userId: currentUser?.id || 'current-user',
      userName: currentUser?.name || '当前用户',
      userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.email || 'User'}`,
      content,
      images: uploadedImages.length > 0 ? uploadedImages : undefined,
    });
    
    setContent('');
    setUploadedImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#5D4037]">
          评论 ({comments.filter(c => c.postId === postId).length})
        </h2>
      </div>

      {/* Comment Input */}
      <div className="p-6 border-b border-gray-100">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <LogIn className="w-8 h-8 text-[#E67E22]" />
            </div>
            <h3 className="text-lg font-medium text-[#5D4037] mb-2">需要登录才能评论</h3>
            <p className="text-gray-500 mb-4">登录后可以发布评论和图片线索</p>
            <Link
              to="/login"
              className="px-6 py-2 bg-[#E67E22] text-white rounded-xl font-medium hover:bg-[#D35400] transition-colors"
            >
              立即登录
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-[#E67E22]" />
            </div>
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="写下您的评论，提供线索或建议..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E67E22] focus:outline-none transition-colors resize-none"
                rows={3}
              />
              
              {/* Uploaded Images Preview */}
              <AnimatePresence>
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uploadedImages.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-20 h-20 rounded-lg overflow-hidden"
                      >
                        <img src={img} alt={`upload ${index}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
              
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#E67E22] transition-colors"
                >
                  <Image className="w-5 h-5" />
                  <span className="text-sm">添加图片</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim() && uploadedImages.length === 0}
                  className="px-6 py-2 bg-[#E67E22] text-white rounded-xl font-medium hover:bg-[#D35400] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  发布评论
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="p-6">
        {postComments.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ThumbsUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>暂无评论，来发表第一条评论吧！</p>
          </div>
        ) : (
          <div className="space-y-6">
            {postComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLike={() => likeComment(comment.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentItem: React.FC<{ comment: Comment; onLike: () => void }> = ({ comment, onLike }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4"
    >
      <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
        <img
          src={comment.userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default'}
          alt={comment.userName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-[#5D4037]">{comment.userName}</span>
          <span className="text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-gray-600 mb-3">{comment.content}</p>
        
        {/* Comment Images */}
        {comment.images && comment.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {comment.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`comment ${index}`}
                className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            className={`flex items-center gap-1 text-sm transition-colors ${
              comment.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
            <span>{comment.likes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CommentsSection;
