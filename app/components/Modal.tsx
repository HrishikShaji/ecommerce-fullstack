"use client";
import { onClose } from "@/redux/slices/modalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export const Modal = () => {
  const isOpen = useAppSelector((state) => state.modalReducer.value.isOpen);
  const dispatch = useDispatch<AppDispatch>();
  if (!isOpen) return null;
  return (
    <div className=" fixed flex justify-center items-center bg-neutral-900/90 h-screen w-full  z-20 ">
      <div className="w-[500px] h-[300px] bg-white">
        modal
        <button
          onClick={() => dispatch(onClose())}
          className="px-3 py-2 border-2 border-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};
