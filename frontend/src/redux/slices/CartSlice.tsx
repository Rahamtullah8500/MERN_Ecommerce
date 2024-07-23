import { createSlice } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/CartType";

type AppState = {
  mode: string;
  cart: Cart;
};

const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    switchMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", state.mode);
    },
    addToCart: (state, action: { payload: CartItem }) => {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      if (existItem) {
        state.cart.cartItems = state.cart.cartItems.map((item: CartItem) =>
          item._id === existItem._id ? newItem : item
        );
      } else {
        state.cart.cartItems.push(newItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    CART_REMOVE_ITEM: (state, action: { payload: CartItem }) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));

      // return { ...state, cart: { ...state.cart, ...state.cart.cartItems } };
    },
  },
});

export const { switchMode, addToCart,CART_REMOVE_ITEM } = CartSlice.actions;

export default CartSlice.reducer;