import { ReactNode, useEffect, useState } from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { motion } from "framer";

interface SliderProps {
  children: ReactNode[];
  autoSlide: boolean;
  autoSlideInterval: number;
}

export const Slider: React.FC<SliderProps> = ({
  children,
  autoSlide = false,
  autoSlideInterval,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative text-black">
      <div className="group w-[30%] top-0 flex justify-end items-center bg-gradient-to-l from-transparent to-black/70  left-0 h-full  absolute z-30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="h-full hidden group-hover:block absolute w-full bg-gradient-to-l from-transparent to-black "
        />
        <button
          onClick={prev}
          className="absolute left-2 top-50% -translate-y-[50%]"
        >
          <BiSolidLeftArrow color="white" />
        </button>
      </div>
      <div className="group w-[30%] top-0 flex justify-end items-center bg-gradient-to-r from-transparent to-black/70  right-0 h-full  absolute z-30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="h-full hidden group-hover:block absolute w-full bg-gradient-to-r from-transparent to-black "
        />
        <button
          onClick={next}
          className="absolute right-2 top-50% -translate-y-[50%]"
        >
          <BiSolidRightArrow color="white" />
        </button>
      </div>
      <div className="absolute -bottom-6 right-0 left-0 z-10">
        <div className="flex items-center justify-center gap-2">
          {children.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 bg-white rounded-full ${
                curr === i ? "p-[7px]" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="overflow-hidden  relative h-full">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
