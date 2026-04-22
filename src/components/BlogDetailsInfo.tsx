import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { BlogProps } from "../types";

const BlogDetailsInfo = ({
  id,
  title,
  img,
  category,
  day,
  month,
}: BlogProps) => {
  const { i18n } = useTranslation();
  return (
    <Link to={`/blog/${id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Category Badge */}
          <div
            className={`absolute top-4 ${
              i18n.language === "en" ? "left-4" : "right-4"
            } bg-forcarooLightGreen text-white text-[10px] font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider z-10`}
          >
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pt-10 flex-grow relative">
          {/* Date Badge */}
          <div
            className={`absolute -top-8 ${
              i18n.language === "en" ? "right-4" : "left-4"
            } bg-slate-900 text-slate-200 flex flex-col items-center justify-center w-14 h-16 rounded-lg shadow-xl z-20`}
          >
            <span className="text-xl font-bold leading-none">{day}</span>
            <span className="text-[10px] font-black uppercase">{month}</span>
          </div>

          <h3 className="text-[#1a1c1e] text-xl font-bold leading-tight group-hover:text-forcarooLightGreen transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default BlogDetailsInfo;
