import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";

import KrLang from "../locales/kr.json";
import ArLang from "../locales/ar.json";
import EnLang from "../locales/en.json";

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: EnLang },
      ar: { translation: ArLang },
      kr: { translation: KrLang },
    },
    detection: {
      order: ["cookie", "htmlTag"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false, // XSS protection
    },
  });

  export default i18n;
// // Function to force correct direction
// const setDocumentDirection = (lng: string) => {
//   document.documentElement.lang = lng;
//   document.documentElement.dir = ["kr", "ar"].includes(lng) ? "rtl" : "ltr";
// };

// // Listen for language change and apply direction
// i18n.on("languageChanged", (lng) => {
//   setDocumentDirection(lng);
// });

// // Ensure direction is correct on first load
// setTimeout(() => {
//   setDocumentDirection(i18n.language);
// }, 100); // Small delay to ensure correct behavior

