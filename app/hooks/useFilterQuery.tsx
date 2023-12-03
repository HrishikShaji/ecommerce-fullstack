import { setFilterValues } from "@/redux/slices/filterSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
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
      const colorIds = Object.keys(values).filter(
        (value) =>
          values[value].value === true && values[value].filterName === "color",
      );
      const sizeIds = Object.keys(values).filter(
        (value) =>
          values[value].value === true && values[value].filterName === "size",
      );
      const categoryIds = Object.keys(values).filter(
        (value) =>
          values[value].value === true &&
          values[value].filterName === "category",
      );
      const billboardIds = Object.keys(values).filter(
        (value) =>
          values[value].value === true &&
          values[value].filterName === "billboard",
      );
      const queryString = querystring.stringify({
        colorId: colorIds,
        sizeId: sizeIds,
        billboardId: billboardIds,
        categoryId: categoryIds,
      });
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
