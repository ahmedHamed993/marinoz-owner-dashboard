import { createSlice } from "@reduxjs/toolkit";
import {
  LOCAL_STORAGE_USER_TOKEN_KEY,
  LOCAL_STORAGE_USER_DATA_KEY,
} from "../../../utils/contants";

const initialState = {
  userToken: localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY) ?? "",
  userData: localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY) ?? "{}")
    : {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem(
        LOCAL_STORAGE_USER_TOKEN_KEY,
        action.payload.toString(),
      );
    },
    removeUserToken: (state) => {
      state.userToken = "";
      localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN_KEY);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem(
        LOCAL_STORAGE_USER_DATA_KEY,
        JSON.stringify(action.payload),
      );
    },
    removeUserData: (state) => {
      state.userData = {};
      localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
    },
  },
});

export const { setUserToken, removeUserToken, setUserData, removeUserData } =
  userSlice.actions;

export default userSlice.reducer;
