import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { BiPhoneCall } from "react-icons/bi";


const CallBanner = ({ addClass }: { addClass?: string }) => {
  const { t } = useTranslation();
  return (
    <div className="home-call-banner py-20">
      <div className={twMerge(`container mx-auto px-4 ${addClass}`)}>
        <div className="home-call-banner-content grid grid-cols-1 lg:grid-cols-2 justify-center gap-4 bg-forcarooLightGreen p-12 rounded-md">
          <div className="text-center lg:text-start mb-4 lg:mb-0">
            <h2 className="text-2xl md:text-4xl mb-4 font-bold text-slate-50 leading-snug">
              {t("callBanner.titleOne")}
            </h2>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-50/95 leading-snug">
              {t("callBanner.titleTwo")}
            </h2>
          </div>
          <div className="banner-contact flex justify-center lg:justify-end items-center gap-4">
            <a
              href="tel:+9647704455744"
              className="h-16 lg:h-20 w-16 lg:w-20 flex justify-center items-center bg-slate-50 rounded-full group"
            >
              <BiPhoneCall
                className="banner-call-icon text-forcarooLightGreen text-2xl lg:text-4xl transition-all duration-300 group-hover:text-forcarooLightGreen"
              />
            </a>
            <div>
              <h6 className="text-slate-100 font-semibold">
                {t("callBanner.supportTxt")} 24/7
              </h6>
              <h4
                className="mt-2 text-slate-100 text-xl font-bold tracking-wider"
                dir="ltr"
              >
                +964 750 444 4444
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallBanner;
