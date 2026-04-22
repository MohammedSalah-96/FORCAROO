import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import TrustedBannerDescImg from "../assets/trusted-banner-description.png";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiStarsStack } from "react-icons/gi";
import { motion } from "motion/react";

const TrustedBanner = ({ addClass }: { addClass?: string }) => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="trusted-banner py-20 overflow-hidden">
      <div className={twMerge(`container mx-auto px-4 ${addClass}`)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="trusted-banner-content flex flex-col lg:flex-row justify-between gap-4 bg-forcarooLightGreen p-12 rounded-md"
        >
          <div className="w-full lg:w-4/12 relative">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-2xl md:text-4xl font-semibold"
            >
              {t("trustedBanner.title")}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:absolute lg:bottom-2 lg:left-0 flex flex-col lg:flex-row items-start lg:items-center gap-2"
            >
              <img
                src={TrustedBannerDescImg}
                alt="Trusted Banner Description"
              />
              <p className="text-xl text-forcarooTextLight font-semibold">
                {t("trustedBanner.description")}
              </p>
            </motion.div>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="w-full lg:w-8/12 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2"
          >
            <motion.div
              variants={itemVariants}
              className="w-full mr-0 lg:mr-10 border-0 lg:border-r border-forcarooLightGreen/30"
            >
              <div className="w-fit mb-2 lg:mb-6 bg-forcarooLightGreen/15 p-5 rounded-full">
                <GiTakeMyMoney className="fill-forcarooLightGreen text-4xl" />
              </div>
              <h4 className="mb-2 lg:mb-4 text-2xl font-semibold">
                {t("trustedBanner.feature1.title")}
              </h4>
              <p>{t("trustedBanner.feature1.description")}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <div className="w-fit mb-6 bg-forcarooLightGreen/15 p-5 rounded-full">
                <GiStarsStack className="fill-forcarooLightGreen text-4xl" />
              </div>
              <h4 className="mb-4 text-2xl font-semibold">
                {t("trustedBanner.feature2.title")}
              </h4>
              <p>{t("trustedBanner.feature2.description")}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedBanner;
