import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const orderSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    newOrder: (state, action) => {
      // console.log(action.payload.data);
      return { ...state, ...action.payload.data };
    },
  },
});

export const { newOrder } = orderSlice.actions;
export default orderSlice.reducer;
