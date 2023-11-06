"use client";
import { CategoryChild } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import { useState } from "react";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";

export const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const {
    data: categories,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  if (isError) return null;

  return (
    <div className="flex flex-col gap-1 relative">
      <div className="flex gap-5 p-2 h-full bg-neutral-600 items-center">
        <h1>Select</h1>
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <BiDownArrow />
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-12 w-full">
          {isLoading ? (
            <Spinner />
          ) : (
            categories.map((category: CategoryChild) => {
              return (
                <div key={category.id} className=" w-full flex  group gap-2">
                  <div
                    key={category.id}
                    className="bg-neutral-800 p-1 w-[200px] flex items-center  justify-between "
                  >
                    <h1 className="">{category.name}</h1>

                    <div
                      className="cursor-pointer"
                      onClick={() => setIsSubOpen(!isSubOpen)}
                    >
                      <BiRightArrow />
                    </div>
                  </div>
                  <div className=" hidden absolute -right-10 group-hover:block group hover:block">
                    subb
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
