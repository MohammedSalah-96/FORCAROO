import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import TrustedBannerDescImg from "../assets/trusted-banner-description.png";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiStarsStack } from "react-icons/gi";



const TrustedBanner = ({ addClass }: { addClass?: string }) => {
  const { t } = useTranslation();
  return (
    <div className="trusted-banner py-20">
      <div className={twMerge(`container mx-auto px-4 ${addClass}`)}>
        <div className="trusted-banner-content flex flex-col lg:flex-row justify-between gap-4 bg-forcarooLightGreen p-12 rounded-md">
          <div className="w-full lg:w-4/12 relative">
            <h3 className="mb-4 text-2xl md:text-4xl font-semibold">{t("trustedBanner.title")}</h3>
            <div className="lg:absolute lg:bottom-2 lg:left-0 flex flex-col lg:flex-row items-start lg:items-center gap-2">
              <img
                src={TrustedBannerDescImg}
                alt="Trusted Banner Description"
              />
              <p className="text-xl text-forcarooTextLight font-semibold">{t("trustedBanner.description")}</p>
            </div>
          </div>
          <div className="w-full lg:w-8/12 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2">
            <div className="w-full mr-0 lg:mr-10 border-0 lg:border-r border-forcarooLightGreen/30">
              <div className="w-fit mb-2 lg:mb-6 bg-forcarooLightGreen/15 p-5 rounded-full">
                <GiTakeMyMoney className="fill-forcarooLightGreen text-4xl" />
              </div>
              <h4 className="mb-2 lg:mb-4 text-2xl font-semibold">
                {t("trustedBanner.feature1.title")}
              </h4>
              <p>{t("trustedBanner.feature1.description")}</p>
            </div>
            <div className="w-full">
              <div className="w-fit mb-6 bg-forcarooLightGreen/15 p-5 rounded-full">
                <GiStarsStack className="fill-forcarooLightGreen text-4xl" />
              </div>
              <h4 className="mb-4 text-2xl font-semibold">
                {t("trustedBanner.feature2.title")}
              </h4>
              <p>{t("trustedBanner.feature2.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBanner;
