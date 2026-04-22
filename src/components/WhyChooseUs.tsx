import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import WhyChooseUsLottie from "../assets/WhyChooseUsLottie.json";
import { motion } from "motion/react";

import WhyChooseUsFeature1 from "../assets/whychooseus-feature1.png";
import WhyChooseUsFeature2 from "../assets/whychooseus-feature2.png";

const HomeWhyChooseUs = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="home-why-choose-us bg-slate-100 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="h-auto w-full flex flex-col md:flex-row-reverse justify-center gap-12 md:gap-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="home-choose-us-left h-full w-full flex flex-col items-start justify-center gap-5 ps-8 bg-slate-100"
          >
            <div className="flex flex-col justify-center items-start gap-4 md:gap-10 relative">
              <span className="watermark">{t("whyChooseUs.name")}</span>
              <motion.h4
                variants={itemVariants}
                className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10"
              >
                {t("whyChooseUs.title")}
              </motion.h4>
              <motion.h2
                variants={itemVariants}
                className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize"
              >
                {t("whyChooseUs.heading")}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-forcarooTextLight">
                {t("whyChooseUs.description")}
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <motion.div variants={itemVariants}>
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
              </motion.div>
              <motion.div variants={itemVariants}>
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
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-3/4 xl:w-1/2 mx-auto select-none"
          >
            <Lottie animationData={WhyChooseUsLottie} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeWhyChooseUs;
