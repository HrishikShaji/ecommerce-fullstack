"use client";

import { Slider } from "../components/ui/Slider";

const arr = ["red", "green", "yellow"];

const Page = () => {
  return (
    <div className="text-white max-w-lg">
      <Slider autoSlide={true} autoSlideInterval={1000}>
        {arr.map((item, i) => (
          <div
            key={i}
            className="h-20 w-20"
            style={{ backgroundColor: item }}
          ></div>
        ))}
      </Slider>
    </div>
  );
};

export default Page;
