import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false,
    info: {
        name: "",
        email: ""
    }
}

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        login: (state, action) => {
            state.state = true;
            state.info = action.payload;
        },

        logout: (state, action) => {
            state.state = false;
            state.info = { name: "", email: "" }
        }
    }
});

export const {
    login,
    logout
} = accountSlice.actions;

export default accountSlice.reducer;