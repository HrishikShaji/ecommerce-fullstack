import Link from "next/link";

const data = [20, 40, 50];

export const DiscountTiles = () => {
  return (
    <div className="flex gap-2">
      {data.map((item, i) => (
        <Link
          href={`/products?discount=${item}`}
          key={i}
          className="flex flex-col gap-1 items-center"
        >
          <div className="h-28 w-28 bg-red-500 rounded-md flex items-center justify-center text-black">
            <h1 className="font-light text-4xl">{`${item}%`}</h1>
          </div>
          <h1>{`upto ${item}% off`}</h1>
        </Link>
      ))}
    </div>
  );
};
