import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { User } from "../domain/entities/user";
import { userModule } from "../infrastructure/user.module";
import { RootState } from "../../../utils/store";
import i18next from "i18next";

export interface UserState {
  value?: User | null;
  loading: "pending" | "idle";
  error?: SerializedError | null;
}

const initialState = (): UserState => {
  const userStored = localStorage.getItem("user");
  const user = userStored ? (JSON.parse(userStored) as User) : null;
  return {
    value: user,
    loading: "idle",
    error: null,
  };
};

export const signIn = createAsyncThunk(
  "users/fetchByIdStatus",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await userModule().signIn.execute({ email, password });
    localStorage.setItem("user", JSON.stringify(data));
    const language = localStorage.getItem("language");
    if (language === null) {
      localStorage.setItem("language", "es");
    } else if (language === "en") {
      i18next.changeLanguage("en");
    } else if (language === "es") {
      i18next.changeLanguage("es");
    }

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("user");
      state.value = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.value = null;
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
      state.value = action.payload;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.value = null;
      state.loading = "idle";
      state.error = action.error;
    });
  },
});

export const { signOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
