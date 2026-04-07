import { useTranslation } from "react-i18next";
import { useLocalizedData } from "../hooks/useLocalizedData";
import BlogDetailsInfo from "./BlogDetailsInfo";

const BlogCompany = () => {
  const { t } = useTranslation();
  const { blogPosts } = useLocalizedData();
  return (
    <div className="blog py-20">
      <div className="container mx-auto px-4">
        <div className="container mx-auto flex flex-col justify-center items-start gap-4 md:gap-10 relative">
          <span className="watermark">{t("blog.name")}</span>
          <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
            {t("blog.title")}
          </h4>
          <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
            {t("blog.heading")}
          </h2>
          <p className="text-forcarooTextLight">
            {t("blog.description")}
          </p>
        </div>

        <div className="nlog-posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 lg:gap-y-6 gap-x-4 mt-20">
          {blogPosts.map((post) => (
            <BlogDetailsInfo
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              deeperDescription={post.deeperDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCompany;
