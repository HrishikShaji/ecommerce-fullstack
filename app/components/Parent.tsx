"use client";
import { useRef } from "react";
import Child, { ChildRef } from "./Child";

export const Parent = () => {
  const childRef = useRef<ChildRef>(null);
  const state = childRef.current?.open ? "true" : "false";
  return (
    <div
      className="bg-neutral-600 h-[900px] w-full"
      onClick={() => childRef.current?.openMenu()}
    >
      <button className="p-2 rounded-md bg-white">ParentClick</button>
      <Child ref={childRef} />
      {`the state is ${state}`}
    </div>
  );
};
