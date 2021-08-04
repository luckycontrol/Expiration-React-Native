import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const productUpdateSlice = createSlice({
    name: "productUpdate",
    initialState,
    reducers: {
        productUpdate: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { productUpdate } = productUpdateSlice.actions;

export default productUpdateSlice.reducer;