import { useState } from "react";
import CheckBox from "./ui/CheckBox";
import { useGetQuery } from "../hooks/useGetQuery";
import { Color } from "@prisma/client";
import { Spinner } from "./ui/Spinner";

type FilterType = "color" | "size" | "billboard" | "category";

export const FilterModal = () => {
  const [filter, setFilter] = useState<FilterType>("color");
  const [values, setValues] = useState<Record<string, any>>({});
  const handleCheckBox = (key: string, value: boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { data, isError, isLoading } = useGetQuery({
    endpoint: "color",
    queryKey: "colors",
    page: 1,
    sort: "LATEST",
  });
  if (isError) return null;
  return (
    <div className="flex w-[500px] h-[300px] rounded-md overflow-hidden relative">
      <div className="bg-neutral-600 w-1/3 h-full flex flex-col gap-2 p-1">
        <button
          className="hover:bg-neutral-800   border-b-2 border-black text-left px-2"
          onClick={() => setFilter("color")}
        >
          Color
        </button>
        <button
          className="hover:bg-neutral-800 border-b-2 border-black text-left px-2"
          onClick={() => setFilter("size")}
        >
          Size
        </button>
        <button
          className="hover:bg-neutral-800 border-b-2 border-black text-left px-2"
          onClick={() => setFilter("category")}
        >
          Category
        </button>
        <button
          className="hover:bg-neutral-800 border-b-2 border-black text-left px-2"
          onClick={() => setFilter("billboard")}
        >
          Billboard
        </button>
      </div>
      <div className="bg-neutral-500 w-2/3 h-full p-2">
        {filter === "color" ? (
          <div className="flex flex-col gap-2">
            <h1>Color</h1>
            <div>
              {isLoading ? (
                <Spinner />
              ) : (
                data.map((item: Color) => (
                  <CheckBox
                    key={item.id}
                    onChange={(value: boolean) =>
                      handleCheckBox(item.name as string, value)
                    }
                    label={item.name as string}
                    selected={values[item.name as string]}
                  />
                ))
              )}
            </div>
          </div>
        ) : null}
        {filter === "size" ? (
          <div>
            <h1>Size</h1>
          </div>
        ) : null}
        {filter === "category" ? (
          <div>
            <h1>Category</h1>
          </div>
        ) : null}
        {filter === "billboard" ? (
          <div>
            <h1>Billboard</h1>
          </div>
        ) : null}
      </div>
      <button className="p-1 rounded-md bg-white text-black absolute bottom-2 right-2">
        Submit
      </button>
    </div>
  );
};
