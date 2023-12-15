import { ReactNode, useEffect, useState } from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

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
      <div className="h-full left-0 absolute z-10  bg-gradient-to-l flex items-center px-3 from-transparent to-black/50">
        <button onClick={prev}>
          <BiSolidLeftArrow color="white" />
        </button>
      </div>
      <div className="h-full right-0 absolute z-10 bg-gradient-to-r flex items-center px-3 from-transparent to-black/50">
        <button onClick={next}>
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
          className="flex transition-transform  ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
