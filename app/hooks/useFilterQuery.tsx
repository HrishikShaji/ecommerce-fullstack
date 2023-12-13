import {
  setFilterValues,
  setCheckBoxValues,
  setSortValues,
  setFieldValues,
} from "@/redux/slices/filterSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  getFilterFieldQueryString,
  getFilterQueryString,
  getFilterRangeString,
} from "../lib/utils";
import { useEffect, useState } from "react";

export type FilterQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
  setDefault?: () => void;
  setDefaultPrice?: () => void;
  setDefaultField?: () => void;
};
export const useFilterQuery = (props: FilterQueryProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const values = useAppSelector((state) => state.filterReducer.values);
  const checkboxValues = useAppSelector(
    (state) => state.filterReducer.checkboxValues,
  );
  const sortValues = useAppSelector((state) => state.filterReducer.sortValues);
  const fieldValues = useAppSelector(
    (state) => state.filterReducer.fieldValues,
  );

  useEffect(() => {
    if (props.setDefault) {
      props.setDefault();
    }
  }, []);

  useEffect(() => {
    if (props.setDefaultPrice) {
      props.setDefaultPrice();
    }
  }, []);

  useEffect(() => {
    if (props.setDefaultField) {
      props.setDefaultField();
    }
  }, []);

  const setFilterSortValues = ({
    title,
    value,
  }: {
    title: string;
    value: SortType;
  }) => {
    dispatch(
      setSortValues({
        title: title,
        value: value,
      }),
    );
  };

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
      setCheckBoxValues({
        ...checkboxValues,
        [key]: { value: value, filterName: filterName },
      }),
    );
  };
  const setFilterRangeValues = ({ min, max }: { min: number; max: number }) => {
    dispatch(
      setFilterValues({
        ...values,
        price: { min: min, max: max },
      }),
    );
  };

  const setFilterFieldValues = ({
    field,
    value,
  }: {
    field: string;
    value: string;
  }) => {
    dispatch(
      setFieldValues({
        ...fieldValues,
        [field]: value,
      }),
    );
  };

  const queryCheckBoxString = getFilterQueryString({
    values: checkboxValues,
    filterNames: ["color", "size", "category", "billboard", "brand"],
  });
  const queryRangeString = getFilterRangeString({
    values: values,
    filterName: "price",
  });

  const queryFieldString = getFilterFieldQueryString({
    values: fieldValues,
  });

  type FilterQueryProps = {
    endpoint: string;
    queryCheckBoxString: string;
    queryRangeString: string;
    queryFieldString: string;
    page: number;
    sort: SortType;
    searchString: string;
  };

  const fetchFilter = async ({
    endpoint,
    page,
    sort,
    queryRangeString,
    queryCheckBoxString,
    searchString,
    queryFieldString,
  }: FilterQueryProps) => {
    const response = await fetch(
      `/api/${endpoint}?page=${page}&sort=${sort}&${queryCheckBoxString}&${queryRangeString}&searchString=${searchString}&${queryFieldString}`,
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
  };

  const {
    data: response,
    isError,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      props.queryKey,
      props.endpoint,
      sortValues.value,
      props.page,
      search,
      queryRangeString,
      queryCheckBoxString,
      queryFieldString,
    ],
    queryFn: async () =>
      fetchFilter({
        endpoint: props.endpoint,
        page: props.page,
        sort: sortValues.value,
        queryCheckBoxString: queryCheckBoxString,
        queryRangeString: queryRangeString,
        searchString: search,
        queryFieldString: queryFieldString,
      }),
    enabled: true,
  });

  const data = response?.data;
  const count = response?.count;
  return {
    setFilterCheckBoxValues,
    setFilterRangeValues,
    setFilterSortValues,
    setFilterFieldValues,
    count,
    data,
    error,
    isError,
    refetch,
    isLoading,
    values,
    checkboxValues,
    sortValues,
    search,
    setSearch,
  };
};
