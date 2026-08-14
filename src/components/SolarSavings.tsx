import SolarSavingsImg from "@/assets/solar-bg-saving.jpg";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { GiBattery75 } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const SolarSavings = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="solar-savings w-full pt-20 mb-20 bg-slate-100 select-none overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-start gap-4 md:gap-10 relative"
        >
          <span className="watermark">{t("solarSavings.name")}</span>
          <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
            {t("solarSavings.title")}
          </h4>
          <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
            {t("solarSavings.heading")}
          </h2>
        </motion.div>
        <div className="solar-savings-content w-full flex flex-wrap lg:flex-nowrap items-stretch justify-center">
          <div className="solar-savings-details container mx-auto w-full flex flex-col items-center justify-center gap-6 p-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-forcarooTextLight"
            >
              {t("solarSavings.description")}
            </motion.p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="solar-saveings-details-benefits flex flex-col items-center justify-center gap-6 mt-4"
            >
              {[
                { icon: FaMoneyBillWave, key: "bill" },
                { icon: MdEnergySavingsLeaf, key: "eco" },
                { icon: GiBattery75, key: "long" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="h-20 w-20 flex items-center justify-center mx-auto bg-forcarooLightGreen border border-forcarooLightGreen rounded-full transition-all duration-300 group-hover:bg-forcarooLightGreen/10">
                    <item.icon
                      size={28}
                      className="text-slate-50 transition-all duration-300 group-hover:text-forcarooLightGreen group-hover:rotate-[360deg]"
                    />
                  </div>
                  <h3 className="mt-2 text-forcarooText text-xl font-semibold">
                    {t(`solarSavings.advantages.${item.key}`)}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="solar-savings-img w-full flex relative after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-forcarooLightGreen/20"
          >
            <img
              height={584}
              width={484}
              src={SolarSavingsImg}
              alt="Solar Savings"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SolarSavings;
