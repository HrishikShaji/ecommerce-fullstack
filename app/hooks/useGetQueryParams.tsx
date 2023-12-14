"use client";

import { useSearchParams } from "next/navigation";

export const useGetQueryParams = () => {
  const searchParams = useSearchParams();

  let checkBoxObj: { id: string | null; filterName: string | null } = {
    id: null,
    filterName: null,
  };
  let rangeObj: { min: number | null; max: number | null } = {
    min: 0,
    max: 10000,
  };
  const fieldObj = searchParams.get("discount"); // Use searchParams to get the discount parameter

  if (searchParams.get("billboardId")) {
    checkBoxObj = {
      id: searchParams.get("billboardId"),
      filterName: "billboard",
    };
  } else if (searchParams.get("categoryId")) {
    checkBoxObj = {
      id: searchParams.get("categoryId"),
      filterName: "category",
    };
  } else if (searchParams.get("colorId")) {
    checkBoxObj = { id: searchParams.get("colorId"), filterName: "color" };
  } else if (searchParams.get("brandId")) {
    checkBoxObj = { id: searchParams.get("brandId"), filterName: "brand" };
  }

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  if (minPrice !== null && maxPrice !== null) {
    rangeObj = { min: Number(minPrice), max: Number(maxPrice) };
  }

  return { checkBoxObj, rangeObj, fieldObj };
};
