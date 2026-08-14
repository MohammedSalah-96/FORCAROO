import Icon from "/logo.png";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, NavLink, useLocation } from "react-router";
import { useLocalizedData } from "../hooks/useLocalizedData";
import LanguageSwitcher from "./LanguageSwitcher";
import { Text, X } from "lucide-react";
// import { FaEnvelope } from "react-icons/fa";
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaMeta } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa6";
// import { TbBrandYoutube } from "react-icons/tb";
// import { useTranslation } from "react-i18next";

const Navbar = ({ position = "fixed" }: { position?: string }) => {
  // const { i18n } = useTranslation();
  const { navLinks } = useLocalizedData();
  const [handlMobNav, setHandleMobNav] = useState(false);
  const handleShowNav = () => setHandleMobNav(!handlMobNav);

  const location = useLocation();
  const path = location.pathname;
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (window.scrollY >= 222) {
      setIsScroll(true);
    }

    window.addEventListener("scroll", () => {
      if (scrollY > 180) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <nav
      className={`${position} top-0 h-24 w-full text-forcarooText ${
        isScroll || path !== "/" ? "bg-[#e7efe5]" : "bg-transparent"
      } z-50`}
      role="navigation"
    >
      {/* <div className="info-navbar w-[calc(100vw-40px)] container flex flex-col md:flex-row items-center justify-between mx-auto py-4 md:px-4 lg:px-3">
        <div className="info-communication flex items-center justify-center gap-4">
          <div
            className={`email flex items-center justify-center gap-1 ${
              i18n.language !== "en" && "flex-row-reverse"
            }`}
          >
            <FaEnvelope className="text-forcarooLightGreen" />
            <span className="text-slate-50 text-sm">info@forcaroo.com</span>
          </div>
        </div>
        <div className="info-social hidden md:flex items-center justify-center gap-2">
          <Link
            to=""
            className="p-1.5 bg-forcarooYellow rounded transition duration-300 hover:-translate-y-1"
          >
            <FaMeta className="text-black" />
          </Link>
          <Link
            to=""
            className="p-1.5 bg-forcarooYellow rounded transition duration-300 hover:-translate-y-1"
          >
            <FaInstagram className="text-black" />
          </Link>
          <Link
            to=""
            className="p-1.5 bg-forcarooYellow rounded transition duration-300 hover:-translate-y-1"
          >
            <TbBrandYoutube className="text-black" />
          </Link>
        </div>
      </div> */}

      <div className="container w-full h-full flex justify-between items-center mx-auto">
        <div className="logo h-full flex z-[1]">
          <div className="img-logo flex justify-start items-center gap-1 py-2 px-4 md:ps-4 lg:px-3">
            <Link to="/">
              <img
                src={Icon}
                height={100}
                width={100}
                className="h-auto w-20 md:w-[90px] lg:w-[100px]"
                loading="lazy"
              />
            </Link>
          </div>
        </div>

        <div className="nav-links h-full hidden md:flex justify-between items-center md:gap-4 lg:gap-6 text-forcarooText">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({
                isActive,
              }: any) => `h-full flex items-center justify-center relative transnition-all duration-300 ease-in-out
            ${
              isActive ? "text-forcarooLightGreen" : "text-slate-300/85"
            } hover:text-forcarooLightGreen text-lg font-semibold
            `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="translate hidden md:flex justify-center items-center py-2 md:pe-4 lg:px-3 relative">
          <LanguageSwitcher />
        </div>

        <Button
          type="button"
          variant="link"
          className="md:hidden h-auto"
          onClick={handleShowNav}
        >
          <Text className="h-[28px!important] w-[28px!important] text-forcarooLightGreen" />
        </Button>

        <div
          className={`mob-nav md:hidden fixed top-0 h-screen w-full flex justify-center items-center pb-4 bg-forcarooText text-slate-50 transition-all duration-500 z-50 shadow-md ${
            handlMobNav ? "left-0" : "-left-full"
          }`}
        >
          <div className="absolute top-0 left-0 flex justify-start items-center gap-1 py-2 px-4 md:ps-4 lg:px-3">
            <img
              src={Icon}
              height={100}
              width={100}
              className="h-auto w-20 md:w-[90px] lg:w-[100px]"
              loading="lazy"
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            className="md:hidden h-auto absolute top-0 right-0 px-2"
            onClick={handleShowNav}
          >
            <X className="h-[28px!important] w-[28px!important] text-forcarooLightGreen" />
          </Button>

          <div className="mob-nav-links h-auto flex flex-col justify-between items-center gap-4 text-forcarooText">
            {navLinks?.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => {
                  handleShowNav();
                }}
                className={({
                  isActive,
                }: any) => `h-full flex items-center justify-center relative transnition-all duration-300 ease-in-out
            ${
              isActive
                ? "text-forcarooLightGreen after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-forcarooLightGreen"
                : "text-slate-300/85"
            } hover:text-forcarooLightGreen text-lg font-semibold`}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="mob-translate flex justify-center items-center mt-8 py-2 px-3 relative">
              <LanguageSwitcher />
              {/* <LanguageSwitcher onClick={handleShowNav} /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
