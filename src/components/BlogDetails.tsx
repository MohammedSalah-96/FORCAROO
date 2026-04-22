import BlogPageImg from "@/assets/blog-page.jpg";
import { useLocation, useParams } from "react-router";
import { BlogProps } from "../types";
import NotFound from "./NotFound";
import CallBanner from "./CallBanner";
import TrustedPartners from "./TrustedPartners";
import { useLocalizedData } from "../hooks/useLocalizedData";
import OtherPagesHero from "./OtherPagesHero";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const BlogDetails = () => {
  const { t, i18n } = useTranslation();
  const { blogPosts } = useLocalizedData();
  const { blogId } = useParams();
  const blogType: BlogProps | undefined = blogPosts.find(
    (blogType) => blogType.id === Number(blogId)
  );

  if (!blogType) return <NotFound />;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="blog-details w-full">
      <OtherPagesHero page_name={t("navLinks.blog")} page_bg_img={BlogPageImg} />

      <div className="blog-details-post container mx-auto mt-20 px-4 max-w-5xl">
        <div className="flex flex-col gap-8 bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          {/* Hero Image Section */}
          <div className="relative h-[300px] md:h-[500px]">
            <img
              src={blogType.img}
              alt={blogType.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Badges Overlay */}
            <div
              className={`absolute top-6 ${
                i18n.language === "en" ? "left-6" : "right-6"
              } flex gap-3`}
            >
              <span className="bg-forcarooLightGreen text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                {blogType.category}
              </span>
            </div>

            {/* Floating Date */}
            <div
              className={`absolute -bottom-8 ${
                i18n.language === "en" ? "right-10" : "left-10"
              } bg-slate-900 text-slate-200 w-20 h-24 flex flex-col items-center justify-center rounded-2xl shadow-2xl z-20`}
            >
              <span className="text-3xl font-black">{blogType.day}</span>
              <span className="text-xs font-bold uppercase tracking-tighter opacity-80">
                {blogType.month}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 md:px-12 py-12 md:py-16">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
              {blogType.title}
            </h1>

            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
              <p className="font-medium text-slate-800 border-l-4 border-forcarooLightGreen pl-6 py-2 italic bg-slate-50 rounded-r-lg">
                {blogType.description}
              </p>

              <div className="mt-8 leading-loose">
                {blogType.deeperDescription}
              </div>
            </div>
          </div>
        </div>

        <CallBanner addClass="px-0 mt-20" />
      </div>
      <TrustedPartners />
    </div>
  );
};

export default BlogDetails;
