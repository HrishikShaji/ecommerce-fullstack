import { baseUrl } from "./connect";

export async function getData() {
  console.log(baseUrl);
  const response = await fetch(`${baseUrl}api/sample`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
}
