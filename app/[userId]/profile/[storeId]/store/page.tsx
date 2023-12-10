"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const { userId, storeId } = useParams();
  return (
    <div className="p-10 text-white">
      user is {userId} and store is {storeId}
    </div>
  );
};

export default Page;
