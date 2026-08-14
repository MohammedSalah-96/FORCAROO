import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";
import Icon from "/logo.png";
import { PiEnvelopeLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";
import { useLocalizedData } from "../hooks/useLocalizedData";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const { navLinks, kartalServices } = useLocalizedData();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer py-20 relative">
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-4">
          <div className="footer-company flex flex-col items-start">
            <div className="mb-4 lg:mb-6">
              <img src={Icon} height={160} width={160} loading="lazy" />
            </div>
            <p className="pe-0 md:pe-4 text-forcarooTextLight">
              {t("footer.description")}
            </p>
            <div className="social-links flex items-center gap-4 mt-4 lg:mt-14 text-forcarooText">
              <Link
                to=""
                className="h-10 w-10 flex justify-center items-center py-3 px-2 rounded transition-all duration-300 hover:bg-forcarooLightGreen hover:text-slate-200 group"
              >
                <FaMeta
                  size={20}
                  className="transition-all duration-300 group-hover:rotate-[360deg]"
                />
              </Link>

              <Link
                to=""
                className="h-10 w-10 flex justify-center items-center py-3 px-2 rounded transition-all duration-300 hover:bg-forcarooLightGreen hover:text-slate-200 group"
              >
                <FaInstagram
                  size={20}
                  className="transition-all duration-300 group-hover:rotate-[360deg]"
                />
              </Link>

              <Link
                to=""
                className="h-10 w-10 flex justify-center items-center py-3 px-2 rounded transition-all duration-300 hover:bg-forcarooLightGreen hover:text-slate-200 group"
              >
                <TbBrandYoutube
                  size={20}
                  className="transition-all duration-300 group-hover:rotate-[360deg]"
                />
              </Link>
            </div>
          </div>

          <div className="footer-contacts flex flex-col items-start gap-4 relative">
            <h4 className="mb-4 lg:mb-6 text-3xl font-bold text-forcarooText">
              {t("footer.contactus")}
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <PiEnvelopeLight className="h-10 w-10 py-2 bg-forcarooLightGreen text-slate-200 rounded" />
                <div>
                  <h6 className="text-forcarooTextLight">info@forcaroo.com</h6>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <IoLocationOutline className="h-10 w-10 py-2 bg-forcarooLightGreen text-slate-200 rounded" />
                <div>
                  <h6 className="text-forcarooTextLight">
                    {t("footer.address")}
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-navigation">
            <div className="flex flex-col items-start">
              <h4 className="mb-4 lg:mb-6 text-3xl font-bold text-forcarooText">
                {t("footer.navigation")}
              </h4>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link: any, index: any) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-forcarooTextLight transition-colors hover:text-forcarooLightGreen"
                  >
                    {link.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-services">
            <div className="flex flex-col items-start">
              <h4 className="mb-4 lg:mb-6 text-3xl font-bold text-forcarooText">
                {t("footer.ourservices")}
              </h4>
              <ul className="flex flex-col gap-2">
                {kartalServices?.map((serviceType: any) => (
                  <Link
                    key={serviceType.id}
                    to={`/services/${serviceType.id.toString()}`}
                    className="text-forcarooTextLight transition-colors hover:text-forcarooLightGreen"
                  >
                    {serviceType.service}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="mt-20 lg:mt-12 mb-0 md:mb-4 border-slate-400" />
      </div>

      <div className="copyright absolute bottom-0 left-0 w-full flex justify-center items-center py-4">
        <h6 className="text-forcarooTextLight text-xs md:text-base">
          ©{currentYear} {t("footer.copyright")}{" "}
          <a
            href="https://mo-dev.netlify.app/"
            target="_blank"
            className="text-zinc-500 font-bold underline transition-all duration-300 hover:text-forcarooLightGreen hover:translate-y-1"
          >
            MoDev
          </a>
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
