import { useState } from "react";

export const useCustomHook = () => {
  const [name, setName] = useState("");

  return { setName };
};
