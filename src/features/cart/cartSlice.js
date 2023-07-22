import { createSlice } from "@reduxjs/toolkit";

// Obtén los productos guardados en el localStorage al cargar la página
const getCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: getCartItemsFromLocalStorage(), // Obtén los productos guardados al inicializar el estado
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log(action.payload);

      if (newItem) {
        const existingItem = state.cartItems.find(
          (item) => item.product === newItem.product
        );

        if (existingItem) {
          existingItem.qty = newItem.qty;
        } else {
          state.cartItems.push(newItem);
        }

        saveCartItemsToLocalStorage(state.cartItems);
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const cartItems = getCartItemsFromLocalStorage();
      const updatedCartItems = cartItems.filter(
        (item) => item.product !== productId
      );
      saveCartItemsToLocalStorage(updatedCartItems);
      state.cartItems = updatedCartItems;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

const saveCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export default cartSlice.reducer;
