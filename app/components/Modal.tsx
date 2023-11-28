"use client";
import { onClose } from "@/redux/slices/modalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { BillBoard, Category, Color, Product, Size } from "@prisma/client";
import { SubCategoryAddForm } from "./SubCategoryAddForm";
import { ModalForm } from "./ModalForm";
import { CategoryChild, EndpointType, ProductChild } from "@/types/types";
import { QueryKey } from "@/types/types";
import { BillboardUpdateForm } from "./BillboardUpdateForm";
import { CategoryUpdateForm } from "./CategoryUpdateForm";
import { ProductUpdateForm } from "./ProductUpdateForm";
import { SizeUpdateForm } from "./SizeUpdateForm";
import { ColorUpdateForm } from "./ColorUpdateForm";

type LookupItem = {
  endpoint: EndpointType;
  queryKey: QueryKey;
  action: "Update" | "Add";
};

const lookup: Record<string, LookupItem> = {
  product: {
    endpoint: "product",
    queryKey: "products",
    action: "Update",
  },
  category: {
    endpoint: "category",
    queryKey: "categories",
    action: "Update",
  },
  billboard: {
    endpoint: "billboard",
    queryKey: "billboards",
    action: "Update",
  },
  color: {
    endpoint: "color",
    queryKey: "colors",
    action: "Update",
  },
  size: {
    endpoint: "size",
    queryKey: "sizes",
    action: "Update",
  },
};

export const Modal = () => {
  const isOpen = useAppSelector((state) => state.modalReducer.value.isOpen);
  const data = useAppSelector((state) => state.modalReducer.value.data);
  const mode = useAppSelector((state) => state.modalReducer.value.mode);
  const endpoint = useAppSelector((state) => state.modalReducer.value.endpoint);
  const queryKey = useAppSelector((state) => state.modalReducer.value.queryKey);
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
      </div>
    </div>
  );
};
