import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
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
              <span className="font-serif text-xl font-bold">{t('brand')}</span>
            </div>
            <p className="font-sans text-sm text-warm-beige leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-warm-gold">{t('footer.quickNav')}</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">{t('navigation.home')}</Link>
              <Link to="/search" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">{t('navigation.search')}</Link>
              <Link to="/personal" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">{t('navigation.profile')}</Link>
              <Link to="/associations" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">{t('navigation.associations')}</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-warm-gold">{t('footer.contactUs')}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-warm-gold" />
                <span className="font-sans text-sm text-warm-beige">contact@xqq.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-warm-gold" />
                <span className="font-sans text-sm text-warm-beige">400-888-8888</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-warm-gold" />
                <span className="font-sans text-sm text-warm-beige">{t('footer.address')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-warm-gold/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-warm-beige">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="font-sans text-sm text-warm-beige hover:text-warm-gold transition-colors">{t('footer.terms')}</Link>
            <span className="font-sans text-sm text-warm-beige">{t('footer.help')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}