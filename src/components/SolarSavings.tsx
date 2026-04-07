import SolarSavingsImg from "@/assets/solar-bg-saving.jpg";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { GiBattery75 } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const SolarSavings = () => {
  const { t } = useTranslation();
  return (
    <div className="solar-savings w-full pt-20 mb-20 bg-slate-100 select-none">
      <div className="container mx-auto flex flex-col justify-center items-start gap-4 md:gap-10 relative">
        <span className="watermark">{t("solarSavings.name")}</span>
        <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
          {t("solarSavings.title")}
        </h4>
        <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
          {t("solarSavings.heading")}
        </h2>
      </div>
      <div className="solar-savings-content w-full flex flex-wrap lg:flex-nowrap items-stretch justify-center">
        <div className="solar-savings-details container mx-auto w-full flex flex-col items-center justify-center gap-6 p-4">
          <p className="text-forcarooTextLight">
            {t("solarSavings.description")}
          </p>
          <div className="solar-saveings-details-benefits flex flex-col items-center justify-center gap-6 mt-4">
            <div className="text-center group">
              <div className="h-20 w-20 flex items-center justify-center mx-auto bg-forcarooLightGreen border border-forcarooLightGreen rounded-full transition-all duration-300 group-hover:bg-forcarooLightGreen/10">
                <FaMoneyBillWave
                  size={28}
                  className="text-slate-50 transition-all duration-300 group-hover:text-forcarooLightGreen group-hover:rotate-[360deg]"
                />
              </div>
              <h3 className="mt-2 text-forcarooText text-xl font-semibold">
                {t("solarSavings.advantages.bill")}
              </h3>
            </div>
            <div className="text-center group">
              <div className="h-20 w-20 flex items-center justify-center mx-auto bg-forcarooLightGreen border border-forcarooLightGreen rounded-full transition-all duration-300 group-hover:bg-forcarooLightGreen/10">
                <MdEnergySavingsLeaf
                  size={28}
                  className="text-slate-50 transition-all duration-300 group-hover:text-forcarooLightGreen group-hover:rotate-[360deg]"
                />
              </div>
              <h3 className="mt-2 text-forcarooText text-xl font-semibold">
                {t("solarSavings.advantages.eco")}
              </h3>
            </div>
            <div className="text-center group">
              <div className="h-20 w-20 flex items-center justify-center mx-auto bg-forcarooLightGreen border border-forcarooLightGreen rounded-full transition-all duration-300 group-hover:bg-forcarooLightGreen/10">
                <GiBattery75
                  size={28}
                  className="text-slate-50 transition-all duration-300 group-hover:text-forcarooLightGreen group-hover:rotate-[360deg]"
                />
              </div>
              <h3 className="mt-2 text-forcarooText text-xl font-semibold">
                {t("solarSavings.advantages.long")}
              </h3>
            </div>
          </div>
        </div>
        <div className="solar-savings-img w-full flex relative after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-forcarooLightGreen/20">
          <img
            height={584}
            width={484}
            src={SolarSavingsImg}
            alt="Solar Savings"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SolarSavings;
