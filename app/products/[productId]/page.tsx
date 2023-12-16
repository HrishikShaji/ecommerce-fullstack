"use client";
import { Slider } from "@/app/components/ui/Slider";
import { useAddQuery } from "@/app/hooks/useAddQuery";
import { useGetQuery } from "@/app/hooks/useGetQuery";
import { cartItemPayload } from "@/app/lib/validators/cartItem";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const { productId } = useParams();
  const { data, refetch, isError, isLoading, isSuccess } = useGetQuery({
    endpoint: `products/${productId}`,
    queryKey: "product",
    page: 1,
    sort: "LATEST",
  });

  const { isPending, add } = useAddQuery({
    endpoint: `${session?.user.id}/cart`,
    queryKey: "cart",
    reset: () => {},
  });

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleClick = () => {
    const validatedData = cartItemPayload.safeParse({ productId: data.id });
    if (!validatedData.success) {
      throw new Error("error");
    }
    add(validatedData.data);
  };
  return (
    <div className="text-white p-10">
      <div className="flex flex-col gap-10">
        <div className="w-full h-[60vh] oveflow-hidden">
          <Slider autoSlide={false} autoSlideInterval={1000}>
            {data.images.map((item: string) => (
              <div
                className="h-[60vh] w-full bg-white rounded-3xl p-5 flex justify-center"
                key={item}
              >
                <Image
                  key={item}
                  src={item}
                  alt="image"
                  height={1000}
                  width={1000}
                  className=" object-contain "
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">{data.name}</h1>
          <h1>{data.price}$</h1>
        </div>
        <button
          onClick={handleClick}
          className="px-3 py-2 rounded-md bg-white text-black"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Page;
