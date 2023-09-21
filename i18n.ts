import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslations from 'translations/pl/translation.json';

const resources = {
  pl: {
    translation: plTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pl',
    react: {
      useSuspense: false,
      wait: true,
    },
    sort: true,
    pluralSeparator: '_',
    keepRemoved: false,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
  })
  .then(() => {
    i18n.services.pluralResolver.insertRule('pl', {
      numbers: [ 1, 2, 3 ],
      plurals: (n: number) => {
        if (n === undefined) return;
        return Number(
          n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2,
        );
      },
    });
  });

export default i18n;

