import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import WhyChooseUsLottie from "../assets/WhyChooseUsLottie.json";

import WhyChooseUsFeature1 from "../assets/whychooseus-feature1.png";
import WhyChooseUsFeature2 from "../assets/whychooseus-feature2.png";

const HomeWhyChooseUs = () => {
  const { t } = useTranslation();
  return (
    <div className="home-why-choose-us bg-slate-100 py-20">
      <div className="container mx-auto px-4">
        <div className="h-auto w-full flex flex-col md:flex-row-reverse justify-center gap-12 md:gap-0">
          <div className="home-choose-us-left h-full w-full flex flex-col items-start justify-center gap-5 ps-8 bg-slate-100">
            <div className="flex flex-col justify-center items-start gap-4 md:gap-10 relative">
              <span className="watermark">{t("whyChooseUs.name")}</span>
              <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
                {t("whyChooseUs.title")}
              </h4>
              <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
                {t("whyChooseUs.heading")}
              </h2>
              <p className="text-forcarooTextLight">
                {t("whyChooseUs.description")}
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div>
                <img
                  src={WhyChooseUsFeature1}
                  alt="WhyChooseUsFeatures"
                  className="h-16 w-16 mb-1"
                />
                <h4 className="text-forcarooText font-semibold">
                  Alternative Solar Energy Solution
                </h4>
                <p className="text-zinc-600">
                  Extreme attention to detail is the essence of Boo’s unique.
                  designMundi eu sea, liber option sercivi.
                </p>
              </div>
              <div>
                <img
                  src={WhyChooseUsFeature2}
                  alt="WhyChooseUsFeatures"
                  className="h-16 w-16 mb-1"
                />
                <h4 className="text-forcarooText font-semibold">
                  Special Solar EV Charging Port
                </h4>
                <p className="text-zinc-600">
                  Extreme attention to detail is the essence of Boo’s unique.
                  designMundi eu sea, liber option sercivi.
                </p>
              </div>
            </div>
          </div>
          <div className="w-3/4 xl:w-1/2 mx-auto select-none">
            <Lottie animationData={WhyChooseUsLottie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWhyChooseUs;
