import Link from "next/link";

const data = [
  { min: 0, max: 499 },
  { min: 500, max: 999 },
  { min: 1000, max: 1499 },
  { min: 1500, max: 1999 },
  { min: 2000, max: 2499 },
];

export const PriceTiles = () => {
  return (
    <div className="grid grid-cols-5 gap-2 w-full ">
      {data.map((item, i) => (
        <Link
          href={`/products?minPrice=${item.min}&maxPrice=${item.max}`}
          key={i}
          className="text-center hover:bg-neutral-800 py-2 rounded-md duration-700 transition ease-in-out"
        >
          <h6 className="font-light text-4xl">{` <${item.max}$`}</h6>
        </Link>
      ))}
    </div>
  );
};
