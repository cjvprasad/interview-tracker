import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";
// import
export const store = configureStore({
  reducer: rootReducer,
});
