import { setFilterValues } from "@/redux/slices/filterSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { capitalizeFirstChar, getFilterQueryString } from "../lib/utils";
import querystring from "querystring";

export type FilterQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
};
export const useFilterQuery = (props: FilterQueryProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const values = useAppSelector((state) => state.filterReducer.values);
  const setFilterCheckBoxValues = ({
    key,
    value,
    filterName,
  }: {
    key: string;
    value: boolean;
    filterName: string;
  }) => {
    dispatch(
      setFilterValues({
        ...values,
        [key]: { value: value, filterName: filterName },
      }),
    );
  };

  const setFilterRangeValues = ({
    startValue,
    endValue,
  }: {
    startValue: number;
    endValue: number;
  }) => {
    dispatch(
      setFilterValues({
        ...values,
        price: { min: startValue, max: endValue },
      }),
    );
  };

  const queryCheckBoxString = getFilterQueryString({
    values: values,
    filterNames: ["color", "size", "category", "billboard"],
  });
  function getFilterRangeString({
    values,
    filterName,
  }: {
    values: Record<string, any>;
    filterName: string;
  }) {
    const min = values[filterName]?.min;
    const max = values[filterName]?.max;
    if (min && max) {
      const newFilterName = capitalizeFirstChar(filterName);

      return `min${newFilterName}=${min}&max${newFilterName}=${max}`;
    }
  }
  const queryRangeString = getFilterRangeString({
    values: values,
    filterName: "price",
  });

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
        `/api/${props.endpoint}?page=${props.page}&sort=${props.sort}&${queryCheckBoxString}&${queryRangeString}`,
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
    setFilterCheckBoxValues,
    setFilterRangeValues,
    count,
    data,
    error,
    isError,
    refetch,
    isLoading,
    values,
  };
};
