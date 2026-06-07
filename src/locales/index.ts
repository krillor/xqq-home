import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zhCN from './zh-CN/common.json';
import zhTW from './zh-TW/common.json';
import enUS from './en-US/common.json';

const resources = {
  'zh-CN': { translation: zhCN },
  'zh-TW': { translation: zhTW },
  'en-US': { translation: enUS }
};

// 检测浏览器语言
const getBrowserLanguage = () => {
  const languages = Object.keys(resources);
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const match = languages.find(lang => browserLang.startsWith(lang.split('-')[0]));
  return match || 'en-US';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || getBrowserLanguage(),
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    },
    returnObjects: true
  });

export default i18n;
