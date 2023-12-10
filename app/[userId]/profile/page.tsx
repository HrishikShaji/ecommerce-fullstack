"use client";

import StoreForm from "@/app/components/StoreForm";
import { useGetQuery } from "@/app/hooks/useGetQuery";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const { userId } = useParams();
  const { data, isError, isLoading } = useGetQuery({
    endpoint: `${userId}/store`,
    queryKey: "store",
    page: 1,
    sort: "LATEST",
  });
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className="p-10 flex flex-col gap-10 text-white">
      <h1>{userId}</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Create Store</h1>
        <StoreForm />
        <div>
          {data.map((store: any) => (
            <Link href={`/${userId}/profile/${store.id}/store`} key={store.id}>
              {store.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
