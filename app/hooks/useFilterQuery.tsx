import { setFilterValues } from "@/redux/slices/filterSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export type FilterQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
};
export const useFilterQuery = (props: FilterQueryProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [colors, setColors] = useState<string[]>([]);
  const values = useAppSelector((state) => state.filterReducer.values);
  const handleCheckBox = (key: string, value: boolean) => {
    dispatch(setFilterValues({ ...values, [key]: value }));
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
      const response = await fetch(
        `/api/${props.endpoint}?page=${props.page}&sort=${props.sort}&colorId=${colors}`,
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
    setColors,
  };
};
