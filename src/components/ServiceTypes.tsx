import { Link } from "react-router";
import { ServiceTypesProps } from "../types";
import { ArrowRight } from "lucide-react";
import EnergyIcon from "../assets/energy-icon.svg";
import { useTranslation } from "react-i18next";

const ServiceTypes = ({
  id,
  imgSrc,
  imgWidth,
  service,
  title,
  description,
}: ServiceTypesProps) => {
  const { i18n, t } = useTranslation();
  const truncatedDescription =
    description?.length > 120 ? description?.slice(0, 120) : description;
  return (
    <div className="home-service-type h-full bg-slate-100 border border-slate-300/60 rounded-lg shadow-md transition-all duration-500 hover:bg-forcarooLightGreen/85 hover:-translate-y-2 select-none group relative after:absolute after:bottom-0 after:left-[12.5%] after:h-1 after:w-3/4 after:bg-forcarooLightGreen after:rounded-sm after:hover:bg-slate-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full flex justify-center items-center z-10">
        <img
          src={EnergyIcon}
          alt={service}
          className="opacity-5 transition-all group-hover:opacity-10"
          loading="lazy"
        />
      </div>
      <div className="h-full flex flex-col gap-4 py-8 px-6 relative z-20">
        <div
          className="service-type-img h-16 mx-auto md:mx-0"
          style={{ width: imgWidth }}
        >
          <img
            src={imgSrc}
            alt="Kartal Energy Services"
            className="w-full drop-shadow-md"
            loading="lazy"
          />
        </div>
        <h4 className="mt-4 text-forcarooText font-bold uppercase transition-all duration-500 group-hover:text-slate-50 text-center md:text-start">
          {service}
        </h4>
        <h5 className="text-forcarooText transition-all duration-500 group-hover:text-slate-50 text-center md:text-start">
          {title}
        </h5>
        <p className="flex-grow text-base text-forcarooTextLight transition-all duration-500 group-hover:text-slate-200">
          {truncatedDescription}.....
        </p>
        <Link
          to={`/services/${id}`}
          className="justify-self-end w-fit max-w-fit flex justify-center items-center gap-2 py-2 px-4 bg-forcarooLightGreen group-hover:bg-slate-200 text-slate-200 group-hover:text-forcarooLightGreen rounded shadow-md group/read-more"
        >
          <span className="text-sm font-semibold">{t("btnReadMore")}</span>
          <ArrowRight
            size={26}
            className={`p-1 bg-forcarooLightGreen text-slate-100 rounded-full transition-all ${i18n.language === "en" ? "rotate-0 group-hover/read-more:translate-x-1" : "rotate-180 group-hover/read-more:-translate-x-1"}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default ServiceTypes;
