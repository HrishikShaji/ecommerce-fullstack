"use client";

import { SortObjectType, SortType } from "@/types/types";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import {
  setCheckBoxValues,
  setFieldValues,
  setFilterValues,
} from "@/redux/slices/filterSlice";
import { Sort } from "../components/ui/Sort";
import { Feed } from "../components/Feed";
import { useGetQueryParams } from "../hooks/useGetQueryParams";

const sortItems: SortObjectType[] = [
  {
    title: "Latest",
    value: "LATEST",
  },
  {
    title: "Oldest",
    value: "OLDEST",
  },
];
const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkBoxObj, rangeObj, fieldObj } = useGetQueryParams();
  console.log(checkBoxObj, rangeObj, fieldObj);

  const { refetch, search, setSearch, data, isLoading, setFilterSortValues } =
    useFilterQuery({
      endpoint: "filter",
      queryKey: "filters",
      page: 1,
      sort: "LATEST",
      setDefault: () =>
        dispatch(
          setCheckBoxValues({
            [checkBoxObj.id as string]: {
              value: true,
              filterName: checkBoxObj.filterName,
            },
          }),
        ),
      setDefaultPrice: () => {
        dispatch(
          setFilterValues({
            price: { min: rangeObj.min, max: rangeObj.max },
          }),
        );
      },
      setDefaultField: () => {
        dispatch(
          setFieldValues({
            discount: fieldObj,
          }),
        );
      },
    });

  return (
    <div className="flex flex-col gap-5 text-white p-5">
      <div className="flex gap-2 justify-end">
        <div className="flex gap-2">
          <input
            value={search}
            placeholder="type..."
            className="p-2 rounded-md text-black"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="py-2 px-3 rounded-md bg-white text-black"
            onClick={() => refetch()}
          >
            Search
          </button>
        </div>
        <button
          className="px-3 py-2 bg-white text-black rounded-md"
          onClick={() => dispatch(onOpen({ mode: "filter", data }))}
        >
          Filter
        </button>
        <Sort
          sortItems={sortItems}
          setSort={({ title, value }: { title: string; value: SortType }) =>
            setFilterSortValues({ title, value })
          }
        />
      </div>
      <Feed data={data} isLoading={isLoading} />
    </div>
  );
};

export default Page;
