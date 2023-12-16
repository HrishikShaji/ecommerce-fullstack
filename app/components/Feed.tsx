import { ProductChild } from "@/types/types";
import { ProductCard } from "./ProductCard";
import { Spinner } from "./ui/Spinner";

interface FeedProps {
  data: ProductChild[];
  isLoading: boolean;
}

export const Feed: React.FC<FeedProps> = ({ data, isLoading }) => {
  if (isLoading) return <Spinner />;
  console.log(data);
  return (
    <div className="w-full  grid grid-cols-5 gap-4">
      {data.length === 0 ? (
        <h1>No Results</h1>
      ) : (
        data.map((item: ProductChild) => (
          <ProductCard item={item} key={item.id} />
        ))
      )}
    </div>
  );
};
