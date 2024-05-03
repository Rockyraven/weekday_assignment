// store.js

import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./Slices/jobSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    // Add other reducers if needed
  },
});
