import BlogPageImg from "@/assets/blog-page.jpg";
import { useTranslation } from "react-i18next"
import OtherPagesHero from "../components/OtherPagesHero"
import BlogCompany from "../components/BlogCompany";
import CallBanner from "../components/CallBanner";
import TrustedPartners from "../components/TrustedPartners";

const blog = () => {
    const {t}=useTranslation()
  return (
    <div className="w-full">
      <OtherPagesHero page_name={t('navLinks.blog')} page_bg_img={BlogPageImg} />
      <BlogCompany />
      <div className="container mx-auto px-4">
        <CallBanner addClass="px-0" />
      </div>
      <TrustedPartners />
    </div>
  )
}

export default blog