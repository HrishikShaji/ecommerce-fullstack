"use client";

import { Slider } from "../components/ui/Slider";

const arr = [
  "https://images.pexels.com/photos/16756656/pexels-photo-16756656/free-photo-of-black-and-white-photo-of-a-swan-on-a-lake.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "https://images.pexels.com/photos/12701974/pexels-photo-12701974.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "https://images.pexels.com/photos/8653359/pexels-photo-8653359.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "https://images.pexels.com/photos/16756656/pexels-photo-16756656/free-photo-of-black-and-white-photo-of-a-swan-on-a-lake.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "https://images.pexels.com/photos/12701974/pexels-photo-12701974.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "https://images.pexels.com/photos/8653359/pexels-photo-8653359.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
];

const Page = () => {
  return (
    <div className="text-white h-screen w-full flex justify-center items-center flex-col gap-10 ">
      <div className=" h-40  w-40 ">
        <Slider autoSlide={false} autoSlideInterval={1000} slides={arr} />
      </div>

      <div className="h-[200px] m-auto w-[200px] border-2 border-white ">
        <div className="flex gap-2 overflow-hidden">
          <div className="w-40 h-40 bg-white flex-shrink-0" />
          <div className="w-40 h-40 bg-white flex-shrink-0" />
          <div className="w-40 h-40 bg-white flex-shrink-0 " />
        </div>
      </div>
    </div>
  );
};

export default Page;
