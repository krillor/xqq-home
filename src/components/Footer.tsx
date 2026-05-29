import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-warm-brown text-warm-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-orange to-warm-gold rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-serif text-xl font-bold">寻亲桥</span>
            </div>
            <p className="font-sans text-sm text-warm-beige leading-relaxed">
              基于自身经历开发此网站，希望帮助更多的华侨华人跨越山海，重新连接失散的亲情与血脉。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-warm-gold">快速导航</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">首页</Link>
              <Link to="/search" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">寻亲列表</Link>
              <Link to="/personal" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">个人中心</Link>
              <Link to="/parser" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">工具箱</Link>
              <Link to="/associations" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">官方组织</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-warm-gold">联系我们</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-warm-gold" />
                <span className="font-sans text-sm text-warm-beige">contact@xinqinlu.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-warm-gold" />
                <span className="font-sans text-sm text-warm-beige">400-888-8888</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-warm-gold" />
                <span className="font-sans text-sm text-warm-beige">广东省潮州市</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-warm-gold/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-warm-beige">
            © 2026 寻亲桥. 让血脉亲情跨越国界延续
          </p>
          <div className="flex items-center gap-4">
            <span className="font-sans text-sm text-warm-beige">隐私政策</span>
            <span className="font-sans text-sm text-warm-beige">使用条款</span>
            <span className="font-sans text-sm text-warm-beige">帮助中心</span>
          </div>
        </div>
      </div>
    </footer>
  );
}