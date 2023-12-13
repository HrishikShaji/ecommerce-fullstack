import { ReactNode, useEffect, useState } from "react";

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
  });
  return (
    <div className="overflow-hidden  relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
      <div className="absolute -bottom-2 right-0 left-0 z-10">
        <div className="flex items-center justify-center gap-2">
          {children.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? "p-4" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
