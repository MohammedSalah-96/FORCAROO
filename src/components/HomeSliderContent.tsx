import { motion } from "motion/react";
import { HomeSliderContentProps } from "../types";
import { useNavigate } from "react-router";

const HomeSliderContent = ({
  title,
  description,
  imgSrc,
}: HomeSliderContentProps) => {
  const router = useNavigate();
  const handleExploreProducts = () => {
    router("/products");
  };
  const handleContactUs = () => {
    router("/contact");
  };
  return (
    <div className="hero-container h-full w-full flex relative after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-black/60 after:bg-blend-multiply after:z-10">
      <div
        className="hero-slider h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="hero-slider-content container mx-auto px-4 h-full w-full flex flex-col items-start lg:items-center justify-center gap-4 lg:gap-8 relative z-20">
          <div className="lg:text-center">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-heading text-forcarooLightGreen text-5xl font-bold leading-[1.1]"
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-description my-4 text-slate-300 text-sm font-medium"
            >
              {description}
            </motion.p>
          </div>

          <div className="w-full flex items-center justify-start lg:justify-center gap-4">
            <motion.button
              onClick={handleExploreProducts}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hero-btn border border-forcarooLightGreen bg-forcarooLightGreen text-slate-200 px-8 py-3 rounded-md font-semibold hover:bg-forcarooDarkGreen transition-all duration-300 shadow-lg"
            >
              Explore Products
            </motion.button>
            <motion.button
              onClick={handleContactUs}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="hero-btn border border-slate-300 bg-forcarooLightGreen/5 text-slate-300 px-8 py-3 rounded-md font-semibold hover:bg-forcarooLightGreen hover:text-slate-200 hover:border-forcarooLightGreen transition-all duration-300 shadow-lg"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSliderContent;
