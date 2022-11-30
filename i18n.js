import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import resources from './src/locales/resources';

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: false,
  init: () => {},
  detect: function () {
    try {
      const deviceLanguage = (
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
          : NativeModules.I18nManager.localeIdentifier
      ).split('_')[0];

      return deviceLanguage;
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: function () {},
};

i18n
  .use(languageDetectorPlugin)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3',
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
