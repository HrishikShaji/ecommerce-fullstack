"use client";
import { onClose } from "@/redux/slices/modalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { ProductUpdateForm } from "./ProductUpdateForm";
import { BillBoardUpdateForm } from "./BillboardUpdateForm";
import { BillBoard, Category, Color, Product, Size } from "@prisma/client";
import { CategoryUpdateForm } from "./CategoryUpdateForm";
import { SizeUpdateForm } from "./SizeUpdateForm";
import { ColorUpdateForm } from "./ColorUpdateForm";
import { SubCategoryAddForm } from "./SubCategoryAddForm";
import { ModalForm } from "./ModalForm";

export const Modal = () => {
  const isOpen = useAppSelector((state) => state.modalReducer.value.isOpen);
  const data = useAppSelector((state) => state.modalReducer.value.data);
  const title = useAppSelector((state) => state.modalReducer.value.mode);
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
        {title === "product" && (
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-xl font-semibold">Update Product</h1>
            <ModalForm
              data={data}
              endpoint="product"
              queryKey="products"
              action="Update"
            />
          </div>
        )}
        {title === "billboard" && (
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-xl font-semibold">Update Billboard</h1>
            <ModalForm
              data={data}
              endpoint="billboard"
              queryKey="billboards"
              action="Update"
            />
          </div>
        )}
        {title === "category" && (
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-xl font-semibold">Update Category</h1>
            <ModalForm
              data={data}
              endpoint="category"
              queryKey="categories"
              action="Update"
            />
          </div>
        )}
        {title === "size" && (
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-xl font-semibold">Update Size</h1>
            <ModalForm
              data={data}
              endpoint="size"
              queryKey="sizes"
              action="Update"
            />
          </div>
        )}
        {title === "color" && (
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-xl font-semibold">Update Color</h1>
            <ModalForm
              data={data}
              endpoint="color"
              queryKey="colors"
              action="Update"
            />
          </div>
        )}
        {title === "subCategory" && (
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-xl font-semibold">Add SubCategory</h1>
            <SubCategoryAddForm category={data as Category} />
          </div>
        )}
      </div>
    </div>
  );
};
