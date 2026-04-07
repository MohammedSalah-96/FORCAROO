// import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const OtherPagesHero = ({
  page_name,
  page_bg_img,
}: {
  page_name: string;
  page_bg_img: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="h-[calc(100vh-450px)] lg:h-[calc(100vh-350px)] w-full relative">
      <div className="hero-container h-full w-full flex relative after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-slate-900/50 after:bg-blend-multiply after:z-10">
        <div
          className="hero-slider h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${page_bg_img})` }}
        >
          <div className="hero-slider-content h-full w-full flex flex-col items-start justify-center relative z-20">
            <div className="container mx-auto mt-20 lg:mt-0 px-4">
              <h3 className="hero-heading text-forcarooLightGreen text-4xl lg:text-5xl font-bold">
                {t("navLinks.home")} / {page_name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPagesHero;
