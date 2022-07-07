import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
};

const cartSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        changeMode: (state, action) => {
            current(state).mode === "light"
                ? (state.mode = "dark")
                : (state.mode = "light");
        },
    },
});

export const { changeMode } = cartSlice.actions;
export default cartSlice.reducer;
