import ContactPageImg from "@/assets/contact-us-page.jpg";
import CompanyMap from "../components/CompanyMap";
import ContactForm from "../components/ContactForm";
import CallBanner from "../components/CallBanner";
// import TrustedPartners from "../components/TrustedPartners";
import { useTranslation } from "react-i18next";
import OtherPagesHero from "../components/OtherPagesHero";

const contact = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <OtherPagesHero
        page_name={t("navLinks.contact")}
        page_bg_img={ContactPageImg}
      />

      <div className="container mt-20 mx-auto px-4">
        <div className="flex justify-center items-center">
          <h2 className="text-forcarooText text-5xl font-extrabold capitalize">
            {t("contactPage.heading")}
          </h2>
        </div>
        <div className="h-[500px] w-full my-8 mx-auto rounded-md relative after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-zinc-950/40 z-10">
          <CompanyMap />
        </div>
        <p className="mt-2 px-0 md:px-10 lg:px-32 text-zinc-600">
          {t("contactPage.description")}
        </p>
        <div className="contact-form-area mt-8">
          <ContactForm />
        </div>
        <CallBanner addClass="px-0" />
      </div>
      {/* <TrustedPartners /> */}
    </div>
  );
};

export default contact;
