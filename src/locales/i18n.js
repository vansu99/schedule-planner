import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { vi, enUS } from 'date-fns/locale';
import { format as formatDate } from 'date-fns';

// locales
import enLocales from './en.json';
import vnLocales from './vn.json';

const locales = { en: enUS, vn: vi };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: enLocales,
      },
      vn: {
        translations: vnLocales,
      },
    },
    fallbackLng: 'en',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      format: (value, format, lng = 'enUS') => {
        const convertDate = new Date(value);
        if (convertDate) {
          const locale = locales[lng];
          if (format === 'vietnamese')
            return formatDate(convertDate, 'dd/MM/yyyy, HH:mm', { locale });
          if (format === 'english')
            return formatDate(convertDate, 'MMM dd, HH:mm aaa', { locale });

          return formatDate(convertDate, format, { locale });
        }
        return convertDate;
      },
    },
  });

export default i18n;
