import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducers from "../features/cart/cartSlice";
import UserReducer from "../features/users/usersSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducers,
    user: UserReducer,
    order: orderReducer,
  },
});
