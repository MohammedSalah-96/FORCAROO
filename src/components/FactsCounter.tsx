import FactsCounterDetails from "./FactsCounterDetails";
import { PiSolarPanel } from "react-icons/pi";
import { GiCctvCamera } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const FactsCounter = () => {
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
    <div className="container mx-auto py-20 px-4 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-start lg:justify-center lg:flex-nowrap gap-8"
      >
        <motion.div
          variants={itemVariants}
          className="w-full md:w-[calc(50%-16px)] lg:w-full"
        >
          <FactsCounterDetails
            icon={PiSolarPanel}
            title={t("factsCounter.installedPanels")}
            counter_number={12000}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full md:w-[calc(50%-16px)] lg:w-full"
        >
          <FactsCounterDetails
            icon={GiCctvCamera}
            title={t("factsCounter.devicesDeployed")}
            counter_number={70}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full md:w-[calc(50%-16px)] lg:w-full"
        >
          <FactsCounterDetails
            icon={FaUsers}
            title={t("factsCounter.happyClients")}
            counter_number={320}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FactsCounter;
