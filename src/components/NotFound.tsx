import NotFoundPageImg from "@/assets/not-found-page.jpg";
import { useEffect } from "react";
import Footer from "./Footer";
import MainNavigationMenu from "./MainNavigationMenu";

const NotFound = () => {
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);
  return (
    <div className="h-auto w-full relative">
      <div className="bg-zinc-800">
        {/* <Navbar position="relative" /> */}
        <MainNavigationMenu />
      </div>

      <div className="h-[calc(100vh-600px)] lg:h-[calc(100vh-350px)] w-full flex mt-10 lg:mt-20 relative">
        <div
          className="hero-slider h-full w-full flex items-center justify-center bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${NotFoundPageImg})` }}
        ></div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
