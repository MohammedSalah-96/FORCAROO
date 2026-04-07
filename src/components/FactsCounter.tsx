import FactsCounterDetails from "./FactsCounterDetails";
import { PiSolarPanel } from "react-icons/pi";
import { GiCctvCamera } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";

import { useTranslation } from "react-i18next";

const FactsCounter = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-start lg:justify-center lg:flex-nowrap gap-8">
        <div className="w-full md:w-[calc(50%-16px)] lg:w-full">
          <FactsCounterDetails
            icon={PiSolarPanel}
            title={t("factsCounter.installedPanels")}
            counter_number={12000}
          />
        </div>

        <div className="w-full md:w-[calc(50%-16px)] lg:w-full">
          <FactsCounterDetails
            icon={GiCctvCamera}
            title={t("factsCounter.devicesDeployed")}
            counter_number={70}
          />
        </div>

        {/* Third item will take full width on md screens */}
        <div className="w-full md:w-[calc(50%-16px)] lg:w-full">
          <FactsCounterDetails
            icon={FaUsers}
            title={t("factsCounter.happyClients")}
            counter_number={320}
          />
        </div>
      </div>
    </div>
  );
};

export default FactsCounter;
