import Link from "next/link";

const data = [20, 40, 50, 60, 70];

export const DiscountTiles = () => {
  return (
    <div className="grid grid-cols-5 gap-2 w-full ">
      {data.map((item, i) => (
        <Link
          href={`/products?discount=${item}`}
          key={i}
          className="text-center text-red-500 hover:bg-red-900 hover:text-white py-2 rounded-md duration-700 transition ease-in-out"
        >
          <h6 className="font-light text-4xl">{` upto ${item}%`}</h6>
        </Link>
      ))}
    </div>
  );
};
