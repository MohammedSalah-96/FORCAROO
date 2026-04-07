import AboutPageImg from "@/assets/about-us-page.jpg";
import CallBanner from "../components/CallBanner";
// import TrustedPartners from "../components/TrustedPartners";
import AboutCompany from "../components/AboutCompany";
import OtherPagesHero from "../components/OtherPagesHero";
import { useTranslation } from "react-i18next";

const about = () => {
  const {t}=useTranslation()
  return (
    <div className="w-full">
      <OtherPagesHero page_name={t('navLinks.about')} page_bg_img={AboutPageImg} />
      <div className="container mx-auto px-4">
        <AboutCompany />
        <CallBanner addClass="px-0" />
      </div>
      {/* <TrustedPartners /> */}
    </div>
  );
};

export default about;
