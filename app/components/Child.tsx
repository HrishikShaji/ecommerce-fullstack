"use client";

import { Ref, forwardRef, useImperativeHandle, useState } from "react";

interface ChildProps {}

export type ChildRef = {
  openMenu: () => void;
  open: boolean;
};

const Child = (props: ChildProps, ref: Ref<ChildRef>) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        openMenu: () => setOpen((prev) => !prev),
        open: open,
      };
    },
    [open],
  );

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {open && (
        <div className="h-[300px] w-[300px] bg-neutral-800 text-white">
          hello
        </div>
      )}
    </div>
  );
};

export default forwardRef(Child);
