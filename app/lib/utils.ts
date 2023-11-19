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

    return input;
  });
  return data;
}
