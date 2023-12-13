import { SortType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

type SortValue = {
  value: SortType;
  title: string;
};

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    values: { price: { min: 0, max: 10000 } } as Record<string, any>,
    checkboxValues: {},
    sortValues: { title: "Latest", value: "LATEST" } as SortValue,
    fieldValues: {},
  },
  reducers: {
    setFilterValues: (state, action) => {
      state.values = action.payload;
    },
    setCheckBoxValues: (state, action) => {
      state.checkboxValues = action.payload;
    },
    setSortValues: (state, action) => {
      state.sortValues = action.payload;
    },
    setFieldValues: (state, action) => {
      state.fieldValues = action.payload;
    },
  },
});

export const {
  setFilterValues,
  setCheckBoxValues,
  setSortValues,
  setFieldValues,
} = filterSlice.actions;
export default filterSlice.reducer;
