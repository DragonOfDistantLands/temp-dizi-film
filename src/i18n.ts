import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        bestSeries: 'Best Series',
        legendaryMovies: 'Legendary Movies',
        discover: 'Discover',
        howToDownload: 'How to Download',
        about: 'About',
        contact: 'Contact',
      },
    },
  },
  tr: {
    translation: {
      nav: {
        home: 'Anasayfa',
        bestSeries: 'En İyi Diziler',
        legendaryMovies: 'Efsane Filmler',
        discover: 'Keşfet',
        howToDownload: 'Nasıl İndirilir?',
        about: 'Hakkımızda',
        contact: 'İletişim',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'tr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;