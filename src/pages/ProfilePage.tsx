import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, FileText, MessageCircle, Heart, Settings, Bell, ChevronRight, BadgeCheck } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { mockPosts } from '@/data/mockData';

export default function ProfilePage() {
  const { user, getUnreadCount, posts } = useStore();
  const unreadCount = getUnreadCount();
  const userPosts = posts.filter(p => p.userId === user?.id).length || mockPosts.slice(0, 2).length;

  const menuItems = [
    { icon: FileText, label: '我的发布', path: '/profile/my-posts', count: userPosts },
    { icon: Heart, label: '我的收藏', path: '/profile/favorites', count: 0 },
    { icon: MessageCircle, label: '消息中心', path: '/profile/messages', count: unreadCount, highlight: unreadCount > 0 },
    { icon: Bell, label: '系统通知', path: '/profile/notifications' },
    { icon: Settings, label: '账号设置', path: '/profile/settings' },
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-card rounded-xl shadow-lg border border-warm-gold/20 p-6 md:p-8 mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=default%20avatar%20placeholder&image_size=square'}
                  alt={user?.nickname || '用户'}
                  className="w-20 h-20 rounded-full border-4 border-warm-gold shadow-md"
                />
                {user?.authStatus === 'verified' && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                    <BadgeCheck size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="font-serif text-2xl text-warm-brown font-bold mb-1">
                  {user?.nickname || '寻亲者'}
                </h1>
                <p className="font-sans text-sm text-warm-brown/70 mb-2">
                  {user?.userType === 'chaoshan_seeker' ? '潮汕寻亲者' : 
                   user?.userType === 'thai_chinese_seeker' ? '泰国华侨寻亲者' : '志愿者协助者'}
                </p>
                {user?.authStatus === 'verified' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent-orange/10 text-accent-orange rounded-full font-sans text-xs">
                    <BadgeCheck size={12} />
                    已认证
                  </span>
                )}
              </div>
              <button
                className="px-4 py-2 bg-warm-beige text-warm-brown rounded-lg font-sans text-sm hover:bg-warm-gold/20 transition-colors"
              >
                编辑资料
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-warm-gold/20">
              <div className="text-center">
                <span className="font-serif text-2xl text-warm-brown font-bold">{userPosts}</span>
                <p className="font-sans text-xs text-warm-brown/60 mt-1">发布信息</p>
              </div>
              <div className="text-center">
                <span className="font-serif text-2xl text-warm-brown font-bold">0</span>
                <p className="font-sans text-xs text-warm-brown/60 mt-1">收到线索</p>
              </div>
              <div className="text-center">
                <span className="font-serif text-2xl text-warm-brown font-bold">0</span>
                <p className="font-sans text-xs text-warm-brown/60 mt-1">成功匹配</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card rounded-xl shadow-lg border border-warm-gold/20">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-4 ${
                  index !== menuItems.length - 1 ? 'border-b border-warm-gold/20' : ''
                } hover:bg-warm-beige/50 transition-colors`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item.highlight ? 'bg-accent-orange/10' : 'bg-warm-beige'
                }`}>
                  <item.icon size={20} className={item.highlight ? 'text-accent-orange' : 'text-warm-gold'} />
                </div>
                <span className="font-sans text-base text-warm-brown flex-1">{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full font-sans text-xs ${
                    item.highlight ? 'bg-accent-orange text-white' : 'bg-warm-beige text-warm-brown'
                  }`}>
                    {item.count}
                  </span>
                )}
                <ChevronRight size={18} className="text-warm-gold" />
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-gradient-to-br from-accent-orange to-warm-gold rounded-xl p-6 text-center"
          >
            <h3 className="font-serif text-lg text-warm-white mb-2">发布寻亲信息</h3>
            <p className="font-sans text-sm text-warm-white/80 mb-4">
              让更多人看到您的寻亲故事，帮助您找到亲人
            </p>
            <Link
              to="/publish"
              className="inline-flex items-center gap-2 px-6 py-3 bg-warm-white text-warm-brown rounded-lg font-sans hover:bg-warm-beige transition-colors shadow-md"
            >
              立即发布
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}