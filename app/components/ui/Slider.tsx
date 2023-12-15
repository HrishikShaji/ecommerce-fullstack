import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

interface SliderProps {
  slides: string[];
  autoSlide: boolean;
  autoSlideInterval: number;
}

export const Slider: React.FC<SliderProps> = ({
  slides,
  autoSlide = false,
  autoSlideInterval,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative text-black">
      <button
        onClick={prev}
        className="absolute z-10 top-[50%] -translate-y-[50%] -left-10"
      >
        <BiSolidLeftArrow color="white" />
      </button>
      <button
        onClick={next}
        className="absolute z-10 right-1 top-[50%] -translate-y-[50%]"
      >
        <BiSolidRightArrow />
      </button>
      <div className="absolute -bottom-10 right-0 left-0 z-10">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? "p-4" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="overflow-hidden  relative h-full">
        <div
          className="flex transition-transform  ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((item, i) => (
            <div
              key={i}
              className="w-40 h-40 object-cover flex-shrink-0 bg-center"
              style={{ backgroundImage: `url(${item})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
