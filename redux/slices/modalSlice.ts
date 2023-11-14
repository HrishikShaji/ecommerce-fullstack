import { CategoryChild } from "@/types/types";
import { BillBoard, Category, Color, Product, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ModalState;
};

type ModalState = {
  isOpen: boolean;
  mode:
    | "product"
    | "category"
    | "size"
    | "color"
    | "billboard"
    | "subCategory"
    | "";
  data: Product | BillBoard | Size | Color | Category;
};

const initialState = {
  value: {
    isOpen: false,
    mode: "",
    data: {},
  } as ModalState,
} as InitialState;

type OpenPayload = {
  data: Product | BillBoard | Size | Color | CategoryChild;
  mode:
    | "product"
    | "category"
    | "size"
    | "color"
    | "billboard"
    | "subCategory"
    | "";
};

export const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    onClose: () => {
      return initialState;
    },
    onOpen: (state, action: PayloadAction<OpenPayload>) => {
      return {
        value: {
          isOpen: true,
          mode: action.payload.mode,
          data: action.payload.data,
        },
      };
    },
  },
});

export const { onOpen, onClose } = modal.actions;
export default modal.reducer;
