import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "음식",
    categoryList: ["음식", "생활용품"],
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.value = action.payload
        },

        createCategory: (state, action) => {
            state.categoryList = state.categoryList.concat(categoryList, action.payload);
        },

        deleteCategory: (state, action) => {
            state.categoryList = state.categoryList.filter((category) => category != action.payload);
        }
    }
});

export const {
    setCategory, 
    createCategory,
    deleteCategory
} = categorySlice.actions;

export default categorySlice.reducer;