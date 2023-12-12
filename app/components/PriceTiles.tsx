import Link from "next/link";

const data = [
  { min: 0, max: 499 },
  { min: 500, max: 999 },
  { min: 1000, max: 1499 },
];

export const PriceTiles = () => {
  return (
    <div className="flex gap-2">
      {data.map((item, i) => (
        <Link
          href={`/products?minPrice=${item.min}&maxPrice=${item.max}`}
          key={i}
          className="flex flex-col gap-1 items-center"
        >
          <div className="h-28 w-28 bg-teal-500 rounded-md flex items-center justify-center text-black">
            <h1 className="font-light text-4xl">{` <${item.max}`}</h1>
          </div>
          <h1>under {item.max}$</h1>
        </Link>
      ))}
    </div>
  );
};
