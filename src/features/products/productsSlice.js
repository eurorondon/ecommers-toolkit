import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: false,
  isError: false,
  error: null,
  pages: "",
  page: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = [...state.productList, ...action.payload.products];
      state.pages = action.payload.pages;
    },
    setPage: (state, action) => {
      state.page = action.payload;
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

export const { setProducts, setPage, setLoading, setError } =
  productsSlice.actions;
export default productsSlice.reducer;
