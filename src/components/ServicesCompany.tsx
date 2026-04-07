import { useTranslation } from "react-i18next";
import { useLocalizedData } from "../hooks/useLocalizedData";
import ServiceTypes from "./ServiceTypes";

const ServicesCompany = () => {
  const { t } = useTranslation();
  const { kartalServices } = useLocalizedData();
  return (
    <div className="home-services py-20">
      <div className="container mx-auto px-4">
        <div className="container mx-auto flex flex-col justify-center items-start gap-4 md:gap-10 relative">
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
        </div>

        <div className="home-services-type grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-4 mt-12">
          {kartalServices?.map((serviceType: any) => (
            <ServiceTypes
              key={serviceType.id}
              id={serviceType.id}
              imgSrc={serviceType.imgSrc}
              imgWidth={serviceType.imgWidth}
              service={serviceType.service}
              title={serviceType.title}
              description={serviceType.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCompany;
