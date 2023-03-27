import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});
