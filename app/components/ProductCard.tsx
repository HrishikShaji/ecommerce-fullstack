import { ProductChild } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  item: ProductChild;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  return (
    <div className="p-2 bg-neutral-700 flex flex-col gap-3 rounded-md">
      <div
        onClick={() => router.push(`/products/${item.id}`)}
        className="bg-white h-[200px] w-full rounded-md flex justify-center items-center p-5"
      >
        <Image
          className="h-[150px] w-[150px]  object-contain"
          alt="image"
          height={1000}
          width={1000}
          src={item.images[0]}
        />
      </div>
      <div>
        <h1 className="font-semibold ">{item.name}</h1>
        <h1 className="text-xs font-semibold">{`${item.price}$`}</h1>
      </div>
    </div>
  );
};
