import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import HomeSliderContent from "../components/HomeSliderContent";
import { useLocalizedData } from "../hooks/useLocalizedData";
import NavigationBtns from "../components/SwiperNavigationBtns";
import { homeSliderImages } from "../data";
import { useTranslation } from "react-i18next";
import "swiper/swiper-bundle.css";

const HomeCarousel = () => {
  const { i18n } = useTranslation();
  const { homeSliderTitles, homeSliderDescriptions } = useLocalizedData();

  return (
    <div className="h-screen w-full relative">
      <Swiper
        // React will treat the Swiper as a "new" component every time i18n.language changes, preventing disappearance issues. we force Swiper to re-render properly.
        key={i18n.language}
        dir={i18n.language === "kr" || i18n.language === "ar" ? "rtl" : "ltr"}
        modules={[Autoplay, Navigation]}
        fadeEffect={{
          crossFade: true,
        }}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
        }}
        speed={1700}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        className="h-full w-full"
      >
        {homeSliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <HomeSliderContent
              title={homeSliderTitles[index]}
              description={homeSliderDescriptions[index]}
              imgSrc={image}
            />
          </SwiperSlide>
        ))}

        <div className="banner absolute bottom-16 lg:h-0 w-full lg:top-[56%] lg:-translate-y-1/2 left-0 flex justify-between items-center z-10">
          <NavigationBtns />
        </div>
      </Swiper>
    </div>
  );
};

export default HomeCarousel;
