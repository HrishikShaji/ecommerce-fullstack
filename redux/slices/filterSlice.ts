import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    values: { price: { min: 0, max: 10000 } } as Record<string, any>,
    checkboxValues: {},
    sortValues: { title: "Latest", value: "LATEST" },
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
  },
});

export const { setFilterValues, setCheckBoxValues, setSortValues } =
  filterSlice.actions;
export default filterSlice.reducer;
