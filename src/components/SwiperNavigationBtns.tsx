import { useSwiper } from "swiper/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const NavigationBtns = () => {
  const swiper = useSwiper();
  return (
    <div className="banner-btns h-full w-full flex justify-center lg:justify-between items-center gap-2 px-4 md:px-6 lg:px-8 bg-none rounded-sm">
      <button
        type="button"
        onClick={() => swiper.slidePrev()}
        className="h-12 w-12 flex items-center justify-center bg-forcarooLightGreen text-slate-50 rounded-full transition duration-500 hover:cursor-pointer overflow-hidden relative group"
      >
        <MdOutlineKeyboardArrowLeft
          size={24}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:-left-1/2"
        />
        <MdOutlineKeyboardArrowLeft
          size={24}
          className="absolute top-1/2 -translate-y-1/2 -right-8 translate-x-1/2 transition-all duration-300 group-hover:right-1/2"
        />
      </button>
      <button
        type="button"
        onClick={() => swiper.slideNext()}
        className="h-12 w-12 flex items-center justify-center bg-forcarooLightGreen text-slate-50 rounded-full transition duration-500 hover:cursor-pointer overflow-hidden relative group"
      >
        <MdOutlineKeyboardArrowRight
          size={24}
          className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 transition-all duration-300 group-hover:-right-1/2"
        />
        <MdOutlineKeyboardArrowRight
          size={24}
          className="absolute top-1/2 -translate-y-1/2 -left-8 -translate-x-1/2 transition-all duration-300 group-hover:left-1/2"
        />
      </button>
    </div>
  );
};

export default NavigationBtns;
