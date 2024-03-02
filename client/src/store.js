import { configureStore } from "@reduxjs/toolkit";
//reducers
import { apiSlice } from "./slices";
import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
  //on production change it to false
  devTools: process.env.NODE_ENV === "development",
});

export default store;
