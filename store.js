import { configureStore }   from "@reduxjs/toolkit";
import categoryReducer      from "./features/Category/categorySlice";
import ProductUpdateReducer from "./features/ProductUpdate/productUpdateSlice";

export const store = configureStore({
    reducer: {
        category        : categoryReducer,
        productUpdate   : ProductUpdateReducer,
    },
})