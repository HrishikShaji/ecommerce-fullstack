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
