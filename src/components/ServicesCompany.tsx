import { useTranslation } from "react-i18next";
import { useLocalizedData } from "../hooks/useLocalizedData";
import ServiceTypes from "./ServiceTypes";
import { motion } from "motion/react";

const ServicesCompany = () => {
  const { t } = useTranslation();
  const { kartalServices } = useLocalizedData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="home-services py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto flex flex-col justify-center items-start gap-4 md:gap-10 relative"
        >
          <span className="watermark">{t("servicesCompany.name")}</span>
          <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
            {t("servicesCompany.title")}
          </h4>
          <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
            {t("servicesCompany.heading")}
          </h2>
          <p className="text-forcarooTextLight">
            {t("servicesCompany.description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="home-services-type grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-4 mt-12"
        >
          {kartalServices?.map((serviceType: any) => (
            <motion.div key={serviceType.id} variants={itemVariants} className="h-full">
              <ServiceTypes
                id={serviceType.id}
                imgSrc={serviceType.imgSrc}
                imgWidth={serviceType.imgWidth}
                service={serviceType.service}
                title={serviceType.title}
                description={serviceType.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesCompany;
