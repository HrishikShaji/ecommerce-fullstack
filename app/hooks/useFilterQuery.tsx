import { setFilterValues } from "@/redux/slices/filterSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import querystring from "querystring";
import { getFilterQueryValues } from "../lib/utils";

export type FilterQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
};
export const useFilterQuery = (props: FilterQueryProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const values = useAppSelector((state) => state.filterReducer.values);
  const handleCheckBox = (key: string, value: boolean, filterName: string) => {
    dispatch(
      setFilterValues({
        ...values,
        [key]: { value: value, filterName: filterName },
      }),
    );
  };

  const {
    data: response,
    isError,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: [props.queryKey],
    queryFn: async () => {
      function getFilterQueryString({
        values,
        filterNames,
      }: {
        values: Record<string, any>;
        filterNames: string[];
      }) {
        const newValues = filterNames.map((filterName) => {
          const filterIds = getFilterQueryValues({
            values: values,
            filterName: filterName,
          });
          return querystring.stringify({ [`${filterName}Id`]: filterIds });
        });
        return newValues.join("&");
      }
      const finalFilterValues = getFilterQueryString({
        values: values,
        filterNames: ["color", "size", "category", "billboard"],
      });

      console.log("finalValues", finalFilterValues);

      const colorIds = getFilterQueryValues({
        values: values,
        filterName: "color",
      });
      const sizeIds = getFilterQueryValues({
        values: values,
        filterName: "size",
      });
      const categoryIds = getFilterQueryValues({
        values: values,
        filterName: "category",
      });
      const billboardIds = getFilterQueryValues({
        values: values,
        filterName: "billboard",
      });
      const queryString = querystring.stringify({
        colorId: colorIds,
        sizeId: sizeIds,
        billboardId: billboardIds,
        categoryId: categoryIds,
      });
      console.log("older ", queryString);
      const response = await fetch(
        `/api/${props.endpoint}?page=${props.page}&sort=${props.sort}&${queryString}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body);
      }
      return response.json();
    },
  });

  const data = response?.data;
  const count = response?.count;
  return {
    handleCheckBox,
    count,
    data,
    error,
    isError,
    refetch,
    isLoading,
    values,
  };
};
