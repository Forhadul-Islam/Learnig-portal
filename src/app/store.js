import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  // devTools: process.env.REACT_APP_NODE_ENV !== "production",
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});
