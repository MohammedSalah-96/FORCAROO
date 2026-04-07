import EnergyIcon from "../assets/energy-icon.svg";
import SolarDevicesIcon from "../assets/solar-devices-icon.png";
import LogisticIcon from "../assets/logitics-icon.png";
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
  const { t } = useTranslation();
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
      <OtherPagesHero
        page_name={t("navLinks.blog")}
        page_bg_img={BlogPageImg}
      />

      <div className="blog-details-post container mx-auto mt-20 px-4">
        <div className="flex flex-col items-center gap-4 py-8 px-6 bg-slate-100 border-4 lg:border-8 border-slate-300/90 rounded-lg shadow-md transition-transform duration-300 select-none relative">
          <div className="service-type-img mx-auto md:mx-0">
            <img
              src={
                Number(blogId) <= 3
                  ? EnergyIcon
                  : Number(blogId) <= 6
                  ? SolarDevicesIcon
                  : LogisticIcon
              }
              alt="Kartal Energy Services"
              className="h-48 w-full drop-shadow-md"
              loading="lazy"
            />
          </div>
          <h4 className="mt-4 text-forcarooText text-lg font-bold uppercase text-center md:text-start">
            {blogType?.title}
          </h4>
          <p className="flex-grow text-base text-zinc-600 px-0 lg:px-8">
            {blogType?.description}
          </p>
          <p className="flex-grow text-base text-zinc-600 px-0 lg:px-8">
            {blogType?.deeperDescription}
          </p>
        </div>

        <CallBanner addClass="px-0" />
      </div>
      <TrustedPartners />
    </div>
  );
};

export default BlogDetails;
