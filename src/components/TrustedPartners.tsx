import i18next from "i18next";
import { trustedPartners } from "../data";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import { useTranslation } from "react-i18next";

const TrustedPartners = () => {
  const { t } = useTranslation();
  return (
    <div className="trusted-partners w-full mb-16 py-16 bg-slate-100">
      <div className="container mx-auto flex flex-col justify-center items-start gap-4 md:gap-10 relative">
        <span className="watermark">{t("trustedPartners.name")}</span>
        <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
          {t("trustedPartners.title")}
        </h4>
        <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
          {t("trustedPartners.heading")}
        </h2>
        <p className="text-forcarooTextLight">
          {t("trustedPartners.description")}
        </p>
      </div>
      <div className="trusted-partners-logo max-h-[95px] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] mt-8">
        <Swiper
          // React will treat the Swiper as a "new" component every time i18n.language changes, preventing disappearance issues. we force Swiper to re-render properly.
          key={i18next.language}
          dir={
            i18next.language === "kr" || i18next.language === "ar"
              ? "rtl"
              : "ltr"
          }
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={2800}
          centeredSlides={true}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          className="h-full w-full"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
          }}
        >
          {trustedPartners.map((partner: any) => (
            <SwiperSlide
              key={partner.id}
              className="flex justify-center items-center"
            >
              <img
                width={partner.imgWidth}
                src={partner.imgUrl}
                alt="Slider"
                className="mx-auto object-cover transition-all md:grayscale md:hover:grayscale-0"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrustedPartners;
