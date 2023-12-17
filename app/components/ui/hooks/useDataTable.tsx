"use client";
import { useGetQuery } from "@/app/hooks/useGetQuery";
import { useSearchQuery } from "@/app/hooks/useSearchQuery";
import {
  EndpointType,
  QueryKey,
  SectionType,
  SortObjectType,
} from "@/types/types";
import { useEffect, useState } from "react";

interface useDataTableProps {
  initialSortObj: SortObjectType;
  endpoint: EndpointType;
  queryKey: QueryKey;
  section: SectionType;
}

export const useDataTable = (props: useDataTableProps) => {
  const [searchString, setSearchString] = useState("");
  const [sort, setSort] = useState<SortObjectType>(props.initialSortObj);
  const [page, setPage] = useState(1);
  const {
    data: allData,
    isError: isDataError,
    count: dataCount,
    isLoading: isDataLoading,
    refetch: refetchData,
  } = useGetQuery({
    endpoint: props.endpoint,
    page: page,
    sort: sort.value,
    queryKeys: [props.queryKey],
  });

  const {
    results: searchData,
    isError: isSearchError,
    isLoading: isSearchLoading,
    refetch: refetchResults,
    count: searchCount,
  } = useSearchQuery({
    searchString: searchString,
    section: props.section,
    page: page,
    sort: sort.value,
  });

  useEffect(() => {
    refetchData();
    refetchResults();
  }, [searchString, sort, page]);

  const data = searchString ? searchData : allData;
  const count = searchString ? searchCount : dataCount;
  const isLoading = searchString ? isSearchLoading : isDataLoading;
  const isError = searchString ? isSearchError : isDataError;

  return {
    data,
    count,
    isLoading,
    setSort,
    setSearchString,
    isError,
    setPage,
    page,
  };
};
