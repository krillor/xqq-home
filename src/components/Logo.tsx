import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-accent-orange to-warm-gold rounded-lg flex items-center justify-center shadow-md">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-warm-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
      <div className="flex flex-col">
        <span className="font-serif text-xl text-warm-brown font-bold leading-tight">
          寻亲路
        </span>
        <span className="font-sans text-xs text-warm-gold leading-tight">
          潮汕 · 泰国
        </span>
      </div>
    </Link>
  );
}