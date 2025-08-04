import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../modules/user/web/user.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
