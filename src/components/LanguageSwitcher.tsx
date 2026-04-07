import { Button } from "./ui/button";
import KurdistanIcon from "@/assets/kurdistan.png";
import ArabIcon from "@/assets/arab1.png";
import EnglishIcon from "@/assets/english1.png";
import i18next from "i18next";
import { useEffect } from "react";
import cookies from "js-cookie";

const LanguageSwitcher = () => {
// const LanguageSwitcher = ({ onClick }: { onClick?: () => void }) => {
  const savedLang = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.dir =
      savedLang === "kr" || savedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18next.language;
    if (i18next.language === "en")
      document.body.style.fontFamily = "Open Sans ,sans-serif";
    if (i18next.language === "kr")
      document.body.style.fontFamily = "Kurd Sans ,sans-serif";
    if (i18next.language === "ar")
      document.body.style.fontFamily = "Rubik ,sans-serif";
  }, [savedLang]);
  return (
    <div className="flex justify-center items-start gap-3 md:gap-2">
      <Button
        variant="link"
        size="lg"
        className="bg-slate-200 text-slate-100 p-2 text-base font-semibold capitalize rounded transition-all hover:-translate-y-1"
        onClick={() => {
          console.log("clicked");
          
          // i18next.changeLanguage("en");
          // document.body.style.fontFamily = "Open Sans";
          // onClick?.();
        }}
        disabled={i18next.language === "en"}
      >
        <img
          src={EnglishIcon}
          about="Translate"
          height={24}
          width={24}
          loading="lazy"
        />
      </Button>

      <Button
        variant="link"
        size="lg"
        className="bg-slate-200 text-slate-100 p-2 text-base font-semibold capitalize rounded transition-all hover:-translate-y-1"
        onClick={() => {
          console.log("clicked");
          
          // i18next.changeLanguage("kr");
          // document.body.style.fontFamily = "Kurd Sans ,sans-serif";
          // onClick?.();
        }}
        disabled={i18next.language === "kr"}
      >
        <img
          src={KurdistanIcon}
          about="Translate"
          height={24}
          width={24}
          loading="lazy"
        />
      </Button>

      <Button
        variant="link"
        size="lg"
        className="bg-slate-200 text-slate-100 p-2 text-base font-semibold capitalize rounded transition-all hover:-translate-y-1"
        onClick={() => {
          console.log("clicked");
          
          // i18next.changeLanguage("ar");
          // document.body.style.fontFamily = "Rubik ,sans-serif";
          // onClick?.();
        }}
        disabled={i18next.language === "ar"}
      >
        <img
          src={ArabIcon}
          about="Translate"
          height={24}
          width={24}
          loading="lazy"
        />
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
