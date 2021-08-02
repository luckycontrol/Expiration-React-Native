import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/Category/categorySlice";

export const store = configureStore({
    reducer: {
        category: categoryReducer
    },
})