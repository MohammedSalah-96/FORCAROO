import { useTranslation } from "react-i18next";
import { useLocalizedData } from "../hooks/useLocalizedData";
import BlogDetailsInfo from "./BlogDetailsInfo";
import { motion } from "motion/react";

const BlogCompany = () => {
  const { t } = useTranslation();
  const { blogPosts } = useLocalizedData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="blog py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto flex flex-col justify-center items-start gap-4 md:gap-10 relative"
        >
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
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="nlog-posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 lg:gap-y-6 gap-x-4 mt-20"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <BlogDetailsInfo
                id={post.id}
                title={post.title}
                description={post.description}
                deeperDescription={post.deeperDescription}
                img={post.img}
                category={post.category}
                day={post.day}
                month={post.month}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogCompany;
