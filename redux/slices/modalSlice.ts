import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ModalState;
};

type ModalState = {
  isOpen: boolean;
};

const initialState = {
  value: {
    isOpen: false,
  } as ModalState,
} as InitialState;

export const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    onClose: () => {
      return initialState;
    },
    onOpen: () => {
      return {
        value: {
          isOpen: true,
        },
      };
    },
  },
});

export const { onOpen, onClose } = modal.actions;
export default modal.reducer;
