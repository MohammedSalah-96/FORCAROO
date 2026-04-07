import { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-forcarooLightGreen text-slate-200 rounded-full transition-all duration-500 shadow-md hover:shadow-2xl"
          aria-label="Scroll to top"
        >
          <MdKeyboardDoubleArrowUp size={20} className="animate-bounce" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
