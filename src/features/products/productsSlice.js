import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: false,
  isError: false,
  error: null,
  pages: "",
  page: "",
};

export const producstSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload.products;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = producstSlice.actions;
export default producstSlice.reducer;
