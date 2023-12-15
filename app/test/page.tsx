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
      <div className=" h-60  w-60 ">
        <Slider autoSlide={false} autoSlideInterval={1000}>
          {arr.map((item, i) => (
            <div
              key={i}
              className="w-60 h-60 object-cover flex-shrink-0 bg-center"
              style={{ backgroundImage: `url(${item})` }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Page;
