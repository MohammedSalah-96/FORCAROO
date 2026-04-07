import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FactsCounterDetailsProps } from "../types";

const FactsCounterDetails = ({
  icon: Icon,
  title,
  counter_number,
}: FactsCounterDetailsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-center gap-8 xl:gap-12 py-4 border-2 border-forcarooText transition-all duration-300 hover:border-forcarooLightGreen hover:shadow-md rounded relative select-none group"
    >
      <div className="p-4 xl:p-6 bg-forcarooLightGreen text-slate-200 rounded transition-all duration-300 group-hover:text-slate-200 group-hover:bg-forcarooText">
        <Icon size={40} />
      </div>
      <div className="flex flex-col">
        <span className="text-forcarooText text-3xl lg:text-4xl xl:text-5xl font-bold transition-all duration-300 group-hover:text-forcarooText">
          {inView ? (
            <CountUp
              start={1}
              end={counter_number}
              separator=","
              duration={4}
              suffix="+"
            />
          ) : (
            <>1+</> // Fallback before animation starts
          )}
        </span>
        <span className="ps-1 text-forcarooTextLight text-sm font-semibold">
          {title}
        </span>
      </div>
      <div>
        <div className="absolute -bottom-8 right-1 text-forcarooText w-16 h-16 transition-all duration-300 group-hover:text-forcarooLightGreen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 17"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M6.95455 6.95455H12.3636L5.40909 17V10.0455H0L6.95455 0V6.95455Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FactsCounterDetails;
