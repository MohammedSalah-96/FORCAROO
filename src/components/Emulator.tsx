import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import EmulatorCalculation from "./EmulatorCalculation";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

const Emulator = () => {
  const { t } = useTranslation();
  return (
    <section className="emulator-details relative py-20">
      {/* Ambient glow so the dark configurator sits deliberately on the light page.
          Clipped by this wrapper rather than the section, so the sticky mobile
          summary inside the configurator keeps working. */}
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
          <span className="watermark">{t("emulator.name")}</span>
          <h4 className="z-10 rounded-lg bg-forcarooLightGreen px-6 py-1 font-extrabold capitalize text-slate-200">
            {t("emulator.title")}
          </h4>
          <h2 className="text-2xl font-extrabold capitalize text-forcarooText md:text-4xl">
            {t("emulator.heading")}
          </h2>
          <p className="max-w-3xl text-forcarooTextLight">
            {t("emulator.description")}
          </p>
          <p className="flex items-center gap-2 text-sm font-semibold text-forcarooLightGreen">
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
            {t("emulator.hint")}
          </p>

          {/* Same picks, guided one step at a time — and drawn at the end */}
          <Link
            to="/system-builder"
            className="group inline-flex items-center gap-2 rounded-full border border-forcarooLightGreen/40 bg-forcarooLightGreen/10 px-5 py-2.5 text-sm font-bold text-forcarooLightGreen transition-colors duration-300 hover:bg-forcarooLightGreen hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70"
          >
            {t("emulator.builderLink")}
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="emulator-calculation mt-10 rounded-3xl shadow-2xl shadow-black/25 ring-1 ring-black/5"
        >
          <EmulatorCalculation />
        </motion.div>
      </div>
    </section>
  );
};

export default Emulator;
