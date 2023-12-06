import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    values: { price: { min: 0, max: 10000 } } as Record<string, any>,
  },
  reducers: {
    setFilterValues: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { setFilterValues } = filterSlice.actions;
export default filterSlice.reducer;
