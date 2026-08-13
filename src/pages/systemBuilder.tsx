import SystemBuilderPageImg from "@/assets/install-solar.jpg";
import CallBanner from "../components/CallBanner";
import OtherPagesHero from "../components/OtherPagesHero";
import SystemBuilder from "../components/SystemBuilder";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const SystemBuilderPage = () => {
  const { t } = useTranslation();
  return (
    <div className="w-ful">
      <OtherPagesHero
        page_name={t("navLinks.builder")}
        page_bg_img={SystemBuilderPageImg}
      />

      <section className="system-builder-details relative py-20">
        {/* Ambient glow so the dark builder sits deliberately on the light page.
            Clipped by this wrapper rather than the section, so anything sticky
            inside the builder keeps working. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-forcarooLightGreen/10 blur-3xl" />
          <span className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-forcarooLightGreen/[0.07] blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-start justify-center gap-4 md:gap-6"
          >
            <span className="watermark">{t("builder.name")}</span>
            <h4 className="z-10 rounded-lg bg-forcarooLightGreen px-6 py-1 font-extrabold capitalize text-slate-200">
              {t("builder.title")}
            </h4>
            <h2 className="text-2xl font-extrabold capitalize text-forcarooText md:text-4xl">
              {t("builder.heading")}
            </h2>
            <p className="max-w-3xl text-forcarooTextLight">
              {t("builder.description")}
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold text-forcarooLightGreen">
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
              {t("builder.hint")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="system-builder mt-10 rounded-3xl shadow-2xl shadow-black/25 ring-1 ring-black/5"
          >
            <SystemBuilder />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <CallBanner addClass="px-0" />
      </div>
    </div>
  );
};

export default SystemBuilderPage;
