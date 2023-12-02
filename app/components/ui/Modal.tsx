"use client";
import { onClose } from "@/redux/slices/modalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { CategoryChild, ProductChild } from "@/types/types";
import { BillboardUpdateForm } from "../BillboardUpdateForm";
import { CategoryUpdateForm } from "../CategoryUpdateForm";
import { ProductUpdateForm } from "../ProductUpdateForm";
import { SizeUpdateForm } from "../SizeUpdateForm";
import { ColorUpdateForm } from "../ColorUpdateForm";
import { BillBoard, Color, Size } from "@prisma/client";
import SubCategoryForm from "../SubCategoryForm";
import { FilterModal } from "../FilterModal";

export const Modal = () => {
  const isOpen = useAppSelector((state) => state.modalReducer.value.isOpen);
  const data = useAppSelector((state) => state.modalReducer.value.data);
  const mode = useAppSelector((state) => state.modalReducer.value.mode);
  const dispatch = useDispatch<AppDispatch>();
  if (!isOpen) return null;
  return (
    <div className=" fixed flex justify-center  items-center text-white bg-neutral-900/90 h-screen w-full  z-20 ">
      <div className="relative p-10 rounded-md flex justify-center items-center bg-neutral-700">
        <button
          onClick={() => dispatch(onClose())}
          className=" absolute right-2 top-2 border-black"
        >
          <AiFillCloseCircle />
        </button>
        {mode === "billboard" && (
          <BillboardUpdateForm data={data as BillBoard} />
        )}
        {mode === "category" && (
          <CategoryUpdateForm data={data as CategoryChild} />
        )}
        {mode === "product" && (
          <ProductUpdateForm data={data as ProductChild} />
        )}
        {mode === "size" && <SizeUpdateForm data={data as Size} />}
        {mode === "color" && <ColorUpdateForm data={data as Color} />}
        {mode === "subCategory" && <SubCategoryForm parentId={data.id} />}
        {mode === "filter" && <FilterModal />}
      </div>
    </div>
  );
};
