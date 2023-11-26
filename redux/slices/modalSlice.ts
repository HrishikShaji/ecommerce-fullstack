import { CategoryChild, EndpointType, QueryKey } from "@/types/types";
import { BillBoard, Category, Color, Product, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ModalState;
};

export type ModeType =
  | "product"
  | "category"
  | "size"
  | "color"
  | "billboard"
  | "subCategory"
  | "";

type ModalState = {
  isOpen: boolean;
  mode: ModeType;
  data: Product | BillBoard | Size | Color | Category;
  endpoint: EndpointType | "";
  queryKey: QueryKey | "";
};

const initialState = {
  value: {
    isOpen: false,
    mode: "",
    data: {},
    endpoint: "",
    queryKey: "",
  } as ModalState,
} as InitialState;

type OpenPayload = {
  data: Product | BillBoard | Size | Color | CategoryChild;
  mode: ModeType;
  endpoint: EndpointType;
  queryKey: QueryKey;
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
          endpoint: action.payload.endpoint,
          queryKey: action.payload.queryKey,
        },
      };
    },
  },
});

export const { onOpen, onClose } = modal.actions;
export default modal.reducer;
