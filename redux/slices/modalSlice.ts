import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ModalState;
};

type ModalState = {
  isOpen: boolean;
  type: "" | "product" | "category" | "size" | "color" | "billboard";
};

const initialState = {
  value: {
    isOpen: false,
    type: "",
  } as ModalState,
} as InitialState;

export const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    onClose: () => {
      return initialState;
    },
    onOpen: (
      state,
      action: PayloadAction<
        "" | "product" | "category" | "size" | "color" | "billboard"
      >,
    ) => {
      return {
        value: {
          isOpen: true,
          type: action.payload,
        },
      };
    },
  },
});

export const { onOpen, onClose } = modal.actions;
export default modal.reducer;
