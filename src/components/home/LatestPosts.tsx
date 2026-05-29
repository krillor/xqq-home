import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, User } from 'lucide-react';
import { mockPosts } from '@/data/mockData';

export default function LatestPosts() {
  const latestPosts = mockPosts.slice(0, 6);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {latestPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link to={`/search/${post.id}`}>
            <div className="bg-gradient-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-warm-gold/20 overflow-hidden group">
              {post.photos.length > 0 && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.photos[0].url}
                    alt={post.seekerName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 rounded text-xs font-sans ${
                      post.seekerType === 'chaoshan_to_thai'
                        ? 'bg-accent-orange text-white'
                        : 'bg-warm-gold text-warm-brown'
                    }`}>
                      {post.seekerType === 'chaoshan_to_thai' ? '潮汕→泰国' : '泰国→潮汕'}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <User size={14} className="text-warm-gold" />
                  <span className="font-sans text-sm text-warm-brown/70">{post.seekerName}</span>
                  <span className="font-serif text-lg text-warm-brown font-bold ml-auto">{post.surname}</span>
                </div>

                <p className="font-sans text-sm text-warm-brown/80 line-clamp-2 mb-4">
                  {post.familyStory}
                </p>

                <div className="flex items-center gap-4 text-xs text-warm-brown/60">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{post.originRegion} → {post.targetRegion}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{post.estimatedYear}年</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-sans ${
                    post.status === 'searching'
                      ? 'bg-green-100 text-green-700'
                      : post.status === 'found'
                      ? 'bg-accent-orange/10 text-accent-orange'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {post.status === 'searching' ? '寻找中' : post.status === 'found' ? '已找到' : '待审核'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}