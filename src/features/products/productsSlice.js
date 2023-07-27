import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: true,
  pages: "",
  page: 0,
  productDetails: [],
  search: "",
};

const productsSlice = createSlice({
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
    // setError: (state, action) => {
    //   state.isError = true;
    //   state.error = action.payload;
    // },
    setProductDetails: (state, action) => {
      state.productDetails = [action.payload];
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setPage,
  setProductDetails,
  setSearch,
} = productsSlice.actions;
export default productsSlice.reducer;
