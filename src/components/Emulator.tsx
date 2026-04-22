import { useTranslation } from "react-i18next";
import EmulatorCalculation from "./EmulatorCalculation";
import { motion } from "motion/react";

const Emulator = () => {
  const { t } = useTranslation();
  return (
    <div className="emulator-details container mx-auto px-4 py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center items-start gap-4 md:gap-10 relative"
      >
        <span className="watermark">{t("emulator.name")}</span>
        <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
          {t("emulator.title")}
        </h4>
        <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
          {t("emulator.heading")}
        </h2>
        <p className="text-forcarooTextLight">{t("emulator.description")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="emulator-calculation mt-8"
      >
        <EmulatorCalculation />
      </motion.div>
    </div>
  );
};

export default Emulator;