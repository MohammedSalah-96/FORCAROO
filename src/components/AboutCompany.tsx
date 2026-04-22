import SolarEngineer from "../assets/about-us1.png";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import FeaturesAboutHome from "./FeaturesAboutHome";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import AboutVideoModal from "./AboutVideoModal";
import { Play } from "lucide-react";
import { motion } from "motion/react";

const AboutCompany = () => {
  const { t } = useTranslation();

  const [showVideoModal, setShowVideoModal] = useState(false);
  const handleShowVideo = () => setShowVideoModal(!showVideoModal);

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
    <div className="container mx-auto px-4 py-20">
      <div className="home-about w-full flex justify-between items-center flex-col lg:flex-row-reverse">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="home-about-left w-full lg:w-5/12 relative"
        >
          <div className="absolute -bottom-8 left-2 py-3.5 px-5 bg-slate-50 rounded-lg border border-forcarooLightGreen z-20">
            <h6 className="text-3xl lg:text-4xl font-semibold">5+</h6>
            <span>Years of Experience</span>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-start items-center gap-2 z-20">
            <button
              type="button"
              onClick={handleShowVideo}
              className="popup-video-btn relative h-16 w-16 flex justify-center items-center bg-slate-50 border border-slate-300 rounded-full"
            >
              <Play className="h-[24px!important] md:h-[24px!important] w-[20px!important] md:w-[24px!important] fill-forcarooLightGreen text-forcarooLightGreen" />
            </button>
          </div>
          <div className="home-about-imgs">
            <div className="home-about-imgs-first h-full md:h-[400px] w-full lg:max-w-full rounded-md overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                height={400}
                width={544}
                src={SolarEngineer}
                alt="Solar Engineer"
                className="h-full w-full rounded-md object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="home-about-right w-full lg:flex-1 flex flex-col justify-center gap-3 mt-28 lg:mt-0 px-4"
        >
          <div className="flex flex-col justify-center items-start gap-4 md:gap-10 relative">
            <span className="watermark">{t("navLinks.about")}</span>
            <motion.h4
              variants={itemVariants}
              className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10"
            >
              {t("aboutCompany.title")}
            </motion.h4>
            <motion.h2
              variants={itemVariants}
              className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize"
            >
              {t("aboutCompany.heading")}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-forcarooTextLight"
            >
              {t("aboutCompany.description")}
            </motion.p>
          </div>
          <motion.div
            variants={containerVariants}
            className="features w-full flex flex-col gap-2 mt-6"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} variants={itemVariants}>
                <FeaturesAboutHome
                  feature_description={`${t(`aboutCompany.feature${i}`)}`}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="home-about-buttons flex justify-start gap-8 mt-4"
          >
            <Link
              to="/about"
              className="flex items-center justify-center gap-3 py-3 px-5 bg-forcarooLightGreen text-slate-50 text-base font-medium md:font-semibold rounded uppercase transition-all duration-500 hover:pe-11 relative group"
            >
              <span className="w-full">{t("btnReadMore")}</span>
              <div className="absolute top-1/2 -translate-y-1/2 right-3.5">
                <BsArrowRight
                  size={20}
                  className="w-0 transition-all duration-500 group-hover:w-full"
                />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {showVideoModal && (
          <AboutVideoModal handleShowModal={handleShowVideo} />
        )}
      </div>
    </div>
  );
};

export default AboutCompany;
