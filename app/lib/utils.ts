import { ZodError, z } from "zod";
import { authOptions } from "./auth";
import { getServerSession, Session } from "next-auth";
import querystring from "querystring";
import { CategoryChild, SortType } from "@/types/types";

export const itemsPerPage = 10;

export function paginateArray({ array, page }: { array: any[]; page: number }) {
  const startIndex = page === 1 ? 0 : (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return array.slice(startIndex, endIndex);
}

export function getSortOrder(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort");
  const order = sort === "LATEST" ? "desc" : "asc";

  return order;
}

export function getFilterSortOrder(sort: SortType | null) {
  if (sort === null) return "desc";
  if (sort === "LATEST") return "desc";
  if (sort === "OLDEST") return "asc";
}

export function getFilterRange({
  min,
  max,
}: {
  min: string | null;
  max: string | null;
}) {
  let value = {};
  if (min !== null && max !== null) {
    value = {
      lte: Number(max),
      gte: Number(min),
    };
  } else {
    value = {
      lte: 10000,
      gte: 0,
    };
  }
  return value;
}
interface ValidateUrlProps<T> {
  request: Request;
  params: string[];
  schema: ValidationSchema<T>;
}

export function validateUrl<T>(props: ValidateUrlProps<T>) {
  try {
    const { searchParams } = new URL(props.request.url);
    const params: Record<string, string | null> = {};
    props.params.forEach((param) => {
      const value = searchParams.get(param);
      params[param] = value;
    });
    if ("sort" in params) {
      params["sort"] = params["sort"] === "LATEST" ? "desc" : "asc";
    }
    const validatedUrl = props.schema.safeParse(params);
    if (!validatedUrl.success) {
      throw new Error("Invalid URL");
    }
    return validatedUrl.data;
  } catch (error) {
    throw error;
  }
}

export type ValidationSchema<T> = z.ZodSchema<T>;
export const validatePayload = <T>({
  schema,
  inputs,
}: {
  schema: ValidationSchema<T>;
  inputs: T;
}) => {
  try {
    const isValidData = schema.parse(inputs);
    return isValidData;
  } catch (error) {
    if (error instanceof ZodError) {
      if (error.errors.length) {
        for (const value of error.errors) {
          throw new Error((value as { message: string }).message);
        }
      }
    }
    throw error;
  }
};

interface AuthUserProps {
  checkRole?: "ADMIN" | "USER" | "SELLER";
}

export const authUser = async (props: AuthUserProps) => {
  try {
    const user = (await getServerSession(authOptions)) as Session;

    if (!user) {
      throw new Error("Login Required");
    }

    if (props.checkRole && props.checkRole === "ADMIN") {
      if (user.user.role !== "ADMIN") {
        throw new Error("Admin Privilege Required");
      }
    }

    if (props.checkRole && props.checkRole === "SELLER") {
      if (user.user.role !== "SELLER") {
        throw new Error("Seller Privilege Required");
      }
    }

    return user;
  } catch (error: any) {
    throw error;
  }
};

export function getFilterQueryValues({
  values,
  filterName,
}: {
  values: Record<string, any>;
  filterName: string;
}) {
  return Object.keys(values).filter(
    (value) =>
      values[value].value === true && values[value].filterName === filterName,
  );
}
export function getFilterQueryString({
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

export function getFilterFieldQueryString({
  values,
}: {
  values: Record<string, any>;
}) {
  return querystring.stringify(values);
}

export function getFilterObj(values: string[]) {
  return values.length === 0 ? {} : { in: values };
}

export function capitalizeFirstChar(string: string) {
  const letters = string.split("");
  const firstLetter = letters[0].toUpperCase();
  letters.shift();

  return firstLetter.concat(letters.join(""));
}

export function getFilterRangeString({
  values,
  filterName,
}: {
  values: Record<string, any>;
  filterName: string;
}) {
  const min = values[filterName]?.min;
  const max = values[filterName]?.max;
  const newFilterName = capitalizeFirstChar(filterName);

  return `min${newFilterName}=${min}&max${newFilterName}=${max}`;
}

export function getCategoryChildrenSplit(categories: CategoryChild[]) {
  const getSubs = (categories: CategoryChild[]): CategoryChild[] => {
    let subCats: CategoryChild[] = [];
    categories.forEach((category) => {
      subCats.push(category);
      if (category.children) {
        subCats = subCats.concat(getSubs(category.children));
      }
    });
    return subCats;
  };

  const allCategories = getSubs(categories);
  const mainCategories = allCategories.filter(
    (cat: CategoryChild) => cat.parentId === null,
  );
  const subCategories = allCategories.filter(
    (cat: CategoryChild) => cat.parentId !== null,
  );

  return { mainCategories, subCategories };
}
