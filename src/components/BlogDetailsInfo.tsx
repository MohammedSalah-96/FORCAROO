import EnergyIcon from "../assets/energy-icon.svg";
import SolarDevicesIcon from "../assets/solar-devices-icon.png";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { BlogProps } from "../types";

const BlogDetailsInfo = ({ id, title, description }: BlogProps) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="p-8 bg-slate-100 border border-zinc-300 rounded-md shadow-md relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full flex justify-center items-center z-10">
        <img
          src={id <= 3 ? EnergyIcon : SolarDevicesIcon}
          alt="forcaroo"
          className="opacity-5 transition-all group-hover:opacity-10"
          loading="lazy"
        />
      </div>
      <div className="h-full flex flex-col items-start gap-4 relative z-10 select-none">
        <h3 className="text-black text-2xl lg:text-3xl font-semibold">
          {title}
        </h3>
        <p className="mt-6 mb-8 text-zinc-600">{description}</p>
        <Link
          to={`/blog/${id}`}
          className="mt-auto w-full max-w-full flex justify-center items-center gap-2 py-2 px-4 bg-forcarooLightGreen text-slate-200 border border-slate-400/10 rounded shadow-md group/read-more"
        >
          <span className="font-semibold">{t("btnReadMore")}</span>
          <ArrowRight
            size={26}
            className={`p-1 text-slate-100 rounded-full transition-all ${
              i18n.language === "en"
                ? "rotate-0 group-hover/read-more:translate-x-1"
                : "rotate-180 group-hover/read-more:-translate-x-1"
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailsInfo;
