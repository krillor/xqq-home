import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Menu, X, FileText, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useAppStore } from '../store/appStore';

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, isLoggedIn, currentUser, logout } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const personalPath = userRole === 'seeker'
    ? '/personal?tab=archive'
    : userRole === 'volunteer'
    ? '/personal?tab=volunteer'
    : '/personal';

  const navItems = [
    { path: '/', label: t('navigation.home'), icon: Home },
    { path: '/search', label: t('navigation.search'), icon: Search },
    { path: '/personal', label: t('navigation.profile'), icon: FileText, href: personalPath },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1100] bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E67E22] to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">寻</span>
            </div>
            <span className="font-bold text-xl text-[#5D4037] hidden sm:block">{t('brand')}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={'href' in item ? item.href! : item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-[#E67E22] text-white shadow-md'
                    : 'text-[#5D4037] hover:bg-orange-50'
                }`}
              >
                <item.icon size={18} />
                <span className="font-sans text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{currentUser?.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#8D6E63] hover:text-[#5D4037] hover:bg-orange-50 rounded-lg"
                >
                  <LogOut size={16} />
                  {t('navigation.logout')}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700"
              >
                <LogIn size={16} />
                {t('navigation.login')}
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-orange-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} className="text-[#5D4037]" /> : <Menu size={24} className="text-[#5D4037]" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-amber-100"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={'href' in item ? item.href! : item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-[#E67E22] text-white'
                    : 'text-[#5D4037] hover:bg-orange-50'
                }`}
              >
                <item.icon size={20} />
                <span className="font-sans">{item.label}</span>
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#8D6E63] hover:text-[#5D4037]"
              >
                <LogOut size={20} />
                <span className="font-sans">{t('navigation.logout')}</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white"
              >
                <LogIn size={20} />
                <span className="font-sans">{t('navigation.login')}</span>
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
