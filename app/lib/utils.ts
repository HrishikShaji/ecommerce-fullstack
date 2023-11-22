import { ZodError } from "zod";
import { InputValuesDataType } from "./data";
import { BillboardPayload, billboardPayload } from "./validators/Billboard";
import { CategoryPayload, categoryPayload } from "./validators/category";
import { SizePayload, sizePayload } from "./validators/size";
import { ProductPayload, productPayload } from "./validators/Product";
import { ColorPayload, colorPayload } from "./validators/color";

export const itemsPerPage = 3;

export function paginateArray({ array, page }: { array: any[]; page: number }) {
  const startIndex = page === 1 ? 0 : (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return array.slice(startIndex, endIndex);
}

export function getSortOrder(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort");
  console.log(sort, "in the backend");
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

const validators = [
  billboardPayload,
  categoryPayload,
  sizePayload,
  colorPayload,
  productPayload,
];

export type PayloadType =
  | BillboardPayload
  | CategoryPayload
  | ProductPayload
  | SizePayload
  | ColorPayload;

export const validatePayload = (inputs, validator) => {
  try {
    const isValidData = validator.parse(inputs);
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
