import ProductsPageImg from "@/assets/products-page.jpg";
import CallBanner from "../components/CallBanner";
// import TrustedPartners from "../components/TrustedPartners";
import OtherPagesHero from "../components/OtherPagesHero";
import { useTranslation } from "react-i18next";
import ProductsCompany from "../components/ProductsCompany";

const products = () => {
  const {t}=useTranslation()
  return (
    <div className="w-ful">
      <OtherPagesHero page_name={t('navLinks.products')} page_bg_img={ProductsPageImg} />
      <ProductsCompany />
      <div className="container mx-auto px-4">
        <CallBanner addClass="px-0" />
      </div>
      {/* <TrustedPartners /> */}
    </div>
  );
};

export default products;
