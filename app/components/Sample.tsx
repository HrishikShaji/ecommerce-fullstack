import { getData } from "../lib/utils";

export const Sample = async () => {
  const categories = await getData();
  return <div>{categories}</div>;
};
