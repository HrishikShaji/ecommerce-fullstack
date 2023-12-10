import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    values: { price: { min: 0, max: 10000 } } as Record<string, any>,
    checkboxValues: {},
  },
  reducers: {
    setFilterValues: (state, action) => {
      state.values = action.payload;
    },
    setCheckBoxValues: (state, action) => {
      state.checkboxValues = action.payload;
    },
  },
});

export const { setFilterValues, setCheckBoxValues } = filterSlice.actions;
export default filterSlice.reducer;
