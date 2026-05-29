import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroStories } from '@/data/mockData';

export default function HeroSection() {
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % heroStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % heroStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + heroStories.length) % heroStories.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-hero z-10" />
          <img
            src={heroStories[currentStory].image}
            alt={heroStories[currentStory].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-sans text-lg md:text-xl text-warm-gold mb-4"
              >
                {heroStories[currentStory].subtitle}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-4xl md:text-6xl text-warm-white mb-6 leading-tight"
              >
                {heroStories[currentStory].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-sans text-lg md:text-xl text-warm-beige leading-relaxed italic"
              >
                "{heroStories[currentStory].quote}"
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {heroStories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStory(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentStory
                ? 'bg-warm-gold scale-125'
                : 'bg-warm-white/50 hover:bg-warm-white/80'
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevStory}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-warm-white/20 hover:bg-warm-white/40 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronLeft size={24} className="text-warm-white" />
      </button>

      <button
        onClick={nextStory}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-warm-white/20 hover:bg-warm-white/40 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronRight size={24} className="text-warm-white" />
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-8 h-12 border-2 border-warm-white/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-warm-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}