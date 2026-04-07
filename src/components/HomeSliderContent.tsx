import { HomeSliderContentProps } from "../types";

const HomeSliderContent = ({
  title,
  description,
  imgSrc,
}: HomeSliderContentProps) => {
  return (
    <div className="hero-container h-full w-full flex relative after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-black/60 after:bg-blend-multiply after:z-10">
      <div
        className="hero-slider h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="hero-slider-content h-full w-full flex flex-col items-start justify-center relative z-20">
          <div className="container mx-auto px-4 lg:text-center">
            <h3 className="hero-heading text-forcarooLightGreen text-5xl font-bold leading-[1.1]">
              {title}
            </h3>
            <p className="hero-description my-4 text-slate-300 text-sm font-medium">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSliderContent;
