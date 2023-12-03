import { ZodError, z } from "zod";
import { authOptions } from "./auth";
import { getServerSession, Session } from "next-auth";

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
  checkRole?: "ADMIN" | "USER";
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
