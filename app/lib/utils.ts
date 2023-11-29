import { ZodError, z } from "zod";
import { InputValuesDataType } from "./data";

export const itemsPerPage = 3;

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

export function getInputValues({
  inputs,
  formData,
}: {
  inputs: InputValuesDataType[];
  formData: Record<string, any>;
}) {
  const data = inputs.map((input) => {
    if (input.type === "Input") {
      const newObj = { ...input, value: formData[input.name] };
      return newObj;
    }
    if (input.type === "DropDown") {
      const newObj = { ...input, value: input.name };
      return newObj;
    }
    if (input.type === "Image") {
      const newObj = { ...input, value: input.name };
      return newObj;
    }

    return input;
  });
  return data;
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
