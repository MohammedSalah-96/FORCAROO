import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Icon from "/logo.png";
// import { useTranslation } from "react-i18next";

const PreLoader = () => {
  // const {  t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // const typewriterHeadline = t("preLoader.typewriterHeadline");
  // const typewriterDescription = t("preLoader.typewriterDescription");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "visible";
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "visible";
    };
  }, []);

  // const sentenceVariantsHeadline = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { staggerChildren: 0.1, delayChildren: 0.44 },
  //   },
  // };

  // const letterVariantsHeadline = {
  //   hidden: { opacity: 0, y: 0, x: -200 },
  //   visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.38 } },
  // };

  // const sentenceVariantsDescription = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { staggerChildren: 0.1, delayChildren: 0.28 },
  //   },
  // };

  // const letterVariantsDescription = {
  //   hidden: { opacity: 0, y: 200, x: 0 },
  //   visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.25 } },
  // };

  // const cursorVariants = {
  //   blink: {
  //     opacity: [0, 1, 0],
  //     transition: { duration: 0.8, repeat: Infinity },
  //   },
  // };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="preloader fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-[#F1F5F9] z-[1000] select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38 }}
        >
          <motion.div
            initial={{ scale: 0, y: -300 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            <motion.img src={Icon} height={180} width={180} loading="lazy" />
          </motion.div>

          {/* <motion.div className="flex items-center justify-center gap-4 mt-4">
            <motion.div
              key={typewriterHeadline}
              variants={sentenceVariantsHeadline}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {i18n.language === "en" ? (
                typewriterHeadline.split("").map((char, i) => (
                  <motion.h1
                    key={`${char}-${i}`}
                    variants={letterVariantsHeadline}
                    style={{
                      marginRight: char === " " ? "2rem" : "0.4rem",
                    }}
                    className="inline-block text-[#056839] text-5xl font-bold"
                  >
                    {char}
                  </motion.h1>
                ))
              ) : (
                <motion.h1
                  variants={letterVariantsHeadline}
                  initial="hidden"
                  animate="visible"
                  className="text-[#056839] text-5xl font-bold text-center"
                  dir="auto"
                >
                  {typewriterHeadline}
                </motion.h1>
              )}
            </motion.div>
          </motion.div>

          <motion.div className="flex items-center justify-center gap-4 mt-4">
            <motion.span
              variants={cursorVariants}
              animate="blink"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                backgroundColor: "#056839",
                marginLeft: "4px",
              }}
            />
            <motion.div
              key={typewriterDescription}
              variants={sentenceVariantsDescription}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block" }}
            >
              {i18n.language === "en" ? (
                typewriterDescription.split("").map((char, i) => (
                  <motion.p
                    key={`${char}-${i}`}
                    variants={letterVariantsDescription}
                    // style={{
                    //   marginRight: char === " " ? "0.3rem md:0.8rem lg:1.5rem" : "0.3rem",
                    // }}
                    className={`inline-block text-[#DBBE27] text-sm md:text-base font-bold ${
                      char === " " ? "mr-2 md:mr-3.5 lg:mr-6" : "mr-1"
                    }`}
                  >
                    {char}
                  </motion.p>
                ))
              ) : (
                <motion.p
                  variants={letterVariantsDescription}
                  initial="hidden"
                  animate="visible"
                  className="text-[#DBBE27] text-base font-bold text-center"
                  dir="auto"
                >
                  {typewriterDescription}
                </motion.p>
              )}
            </motion.div>
            <motion.span
              variants={cursorVariants}
              animate="blink"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                backgroundColor: "#056839",
                marginLeft: "4px",
              }}
            />
          </motion.div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;
