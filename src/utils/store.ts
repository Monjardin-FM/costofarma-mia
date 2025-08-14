import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../modules/user/web/user.reducer";
import { shoppingCartReducer } from "../modules/new-order/web/store/shopping-cart-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
