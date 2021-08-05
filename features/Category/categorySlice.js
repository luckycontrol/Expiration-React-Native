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

        setCategoryList: (state, action) => {
            action.payload.map(({ categoryName }) => {
                state.categoryList.push(categoryName);
            })
        },

        createCategory: (state, action) => {
            state.categoryList.push(action.payload);
        },

        deleteCategory: (state, action) => {
            state.categoryList = state.categoryList.filter((category) => category != action.payload);
        },

        resetCategory: (state, action) => {
            if (state.categoryList.length >= 0) {
                state.value = state.categoryList[0];
            } else {
                state.value = ""
            }
        }
    }
});

export const {
    setCategory,
    setCategoryList,
    createCategory,
    deleteCategory,
    resetCategory
} = categorySlice.actions;

export default categorySlice.reducer;