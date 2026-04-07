import ServicesPageImg from "@/assets/services-page.jpg";
import CallBanner from "../components/CallBanner";
import ServicesCompany from "../components/ServicesCompany";
import TrustedPartners from "../components/TrustedPartners";
import OtherPagesHero from "../components/OtherPagesHero";
import { useTranslation } from "react-i18next";

const services = () => {
  const {t}=useTranslation()
  return (
    <div className="w-ful">
      <OtherPagesHero page_name={t('navLinks.services')} page_bg_img={ServicesPageImg} />
      <ServicesCompany />
      <div className="container mx-auto px-4">
        <CallBanner addClass="px-0" />
      </div>
      <TrustedPartners />
    </div>
  );
};

export default services;
