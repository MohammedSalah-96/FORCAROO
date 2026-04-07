import { useLocation, useParams } from "react-router";
import { ServiceTypesProps } from "../types";
import NotFound from "./NotFound";
import CallBanner from "./CallBanner";
import TrustedPartners from "./TrustedPartners";
import { useLocalizedData } from "../hooks/useLocalizedData";
import { useEffect } from "react";

const ServiceDetails = () => {
  const { kartalServices } = useLocalizedData();
  const { serviceId } = useParams();
  const serviceType: ServiceTypesProps | undefined = kartalServices.find(
    (serviceType) => serviceType.id === Number(serviceId),
  );

  if (!serviceType) return <NotFound />;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="service-details pt-36">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 py-8 px-6 bg-slate-100 border-4 lg:border-8 border-slate-300/90 rounded-lg shadow-md transition-transform duration-300 select-none relative">
          <div
            className="service-type-img h-16 mx-auto md:mx-0"
            style={{ width: serviceType?.imgWidth }}
          >
            <img
              src={serviceType?.imgSrc}
              alt="Kartal Energy Services"
              className="w-full drop-shadow-md"
              loading="lazy"
            />
          </div>
          <h4 className="mt-4 text-cyan-700 text-lg font-bold uppercase text-center md:text-start">
            {serviceType?.service}
          </h4>
          <h5 className="text-cyan-700 font-semibold text-center md:text-start">
            {serviceType?.title}
          </h5>
          <p className="flex-grow text-base text-zinc-600 px-0 lg:px-8">
            {serviceType?.description}
          </p>
        </div>

        <CallBanner addClass="px-0" />
      </div>
      <TrustedPartners />
    </div>
  );
};

export default ServiceDetails;
