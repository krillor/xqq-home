import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { successStories } from '@/data/mockData';

export default function SuccessStoriesPreview() {
  const previewStories = successStories.slice(0, 3);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {previewStories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link to={`/success-stories/${story.id}`}>
            <div className="bg-gradient-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-warm-gold/20 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.afterPhotos[0] ?? story.beforePhotos[0]}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-accent-orange" />
                    <span className="font-sans text-sm text-warm-white">寻亲成功</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-xl text-warm-brown font-bold mb-2">
                  {story.title}
                </h3>
                <p className="font-sans text-sm text-warm-brown/70 line-clamp-2 mb-4">
                  {story.summary}
                </p>

                <div className="flex items-center gap-4 text-xs text-warm-brown/60">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{story.reunionDate.toLocaleDateString('zh-CN')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{story.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}