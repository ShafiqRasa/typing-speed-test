import { configureStore } from "@reduxjs/toolkit";

import typingReducer from "./typingSlice";

export const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
