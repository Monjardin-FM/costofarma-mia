import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../domain/entities/shopping-cart";
import { ShoppingCartItem } from "../../domain/entities/shopping-cart-item";

type ShoppingCartState = {
  cart: ShoppingCart;
};

const initialState = {
  cart: [],
} as ShoppingCartState;

const shoppingCardSlice = createSlice({
  name: "shopping-cart",
  initialState,
  reducers: {
    addItem: (
      state,
      { payload }: PayloadAction<{ item: ShoppingCartItem }>
    ) => {
      state.cart = [...state.cart, payload.item];
    },
    removeItem: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.cart = [...state.cart].filter(
        (_, index) => index !== payload.index
      );
    },
    clear: (state) => {
      state.cart = [];
    },
    updateItem: (
      state,
      {
        payload,
      }: PayloadAction<{
        index: number;
        changes: ShoppingCartItem;
      }>
    ) => {
      state.cart = [...state.cart].map((item, index) =>
        index === payload.index ? { ...item, ...payload.changes } : item
      );
    },
    updateQuantity: (
      state,
      { payload }: PayloadAction<{ index: number; quantity: number }>
    ) => {
      state.cart = [...state.cart].map((item, index) =>
        index === payload.index ? { ...item, quantity: payload.quantity } : item
      );
    },
  },
});

export const { addItem, clear, removeItem, updateItem, updateQuantity } =
  shoppingCardSlice.actions;

export const { reducer: shoppingCartReducer } = shoppingCardSlice;
