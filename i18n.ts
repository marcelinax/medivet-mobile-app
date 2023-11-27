import 'intl';
import 'intl/locale-data/jsonp/pl';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslations from 'translations/pl/translation.json';
import 'intl-pluralrules';
import intervalPlural from 'i18next-intervalplural-postprocessor';

const resources = {
  pl: {
    translation: plTranslations,
  },
};

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'pl',
    react: {
      useSuspense: false,
    },
    sort: true,
    pluralSeparator: '_',
    keepRemoved: false,
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
    returnEmptyString: false,
  });

export default i18n;

