import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { PiEnvelopeLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { motion } from "motion/react";

const CONTACT_EMAIL = "info@forcaroo.com";

const CallBanner = ({ addClass }: { addClass?: string }) => {
  const { t } = useTranslation();
  return (
    <div className="home-call-banner py-20 overflow-hidden">
      <div className={twMerge(`container mx-auto px-4 ${addClass}`)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="home-call-banner-content grid grid-cols-1 lg:grid-cols-2 justify-center gap-4 bg-forcarooLightGreen p-12 rounded-md"
        >
          <div className="text-center lg:text-start mb-4 lg:mb-0">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-4xl mb-4 font-bold text-slate-50 leading-snug"
            >
              {t("callBanner.titleOne")}
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-4xl font-semibold text-slate-50/95 leading-snug"
            >
              {t("callBanner.titleTwo")}
            </motion.h2>
          </div>
          <div className="banner-contact flex justify-center lg:justify-end items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={t("callBanner.emailTxt")}
              className="h-16 lg:h-20 w-16 lg:w-20 flex justify-center items-center bg-slate-50 rounded-full group shrink-0"
            >
              <PiEnvelopeLight className="banner-call-icon text-forcarooLightGreen text-3xl lg:text-5xl transition-all duration-300 group-hover:text-forcarooLightGreen" />
            </motion.a>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h6 className="text-slate-100 font-semibold">
                {t("callBanner.emailTxt")}
              </h6>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 block text-slate-100 text-lg lg:text-xl font-bold tracking-wider underline-offset-4 transition-opacity duration-300 hover:opacity-80 hover:underline"
                dir="ltr"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-2 flex items-center gap-1.5 text-slate-100/90 text-sm">
                <IoLocationOutline className="shrink-0" aria-hidden="true" />
                {t("footer.address")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallBanner;
