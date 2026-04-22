import { useTranslation } from "react-i18next";
import { useLocalizedData } from "../hooks/useLocalizedData";
import { WorkProcessDetailsProps } from "../types";
import WorkProcessDetails from "./WorkProcessDetails";
import { motion } from "motion/react";

const WorkProcess = () => {
  const { t } = useTranslation();
  const { workProcessSteps } = useLocalizedData();

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
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="home-work-process py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-start gap-4 md:gap-10 relative"
        >
          <span className="watermark">{t("workProcess.name")}</span>
          <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
            {t("workProcess.title")}
          </h4>
          <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
            {t("workProcess.heading")}
          </h2>
          <p className="text-forcarooTextLight">
            {t("workProcess.description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="work-process-steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 lg:gap-y-5 gap-x-4 mt-28"
        >
          {workProcessSteps?.map((workProcessStep: WorkProcessDetailsProps) => (
            <motion.div
              key={workProcessStep.process_number}
              variants={itemVariants}
            >
              <WorkProcessDetails
                process_number={workProcessStep.process_number}
                process_img={workProcessStep.process_img}
                process_img_height={workProcessStep.process_img_height}
                process_img_width={workProcessStep.process_img_width}
                process_title={workProcessStep.process_title}
                process_description={workProcessStep.process_description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkProcess;
