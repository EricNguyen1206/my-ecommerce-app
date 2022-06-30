import { createSlice } from "@reduxjs/toolkit";
import { login, register, getType } from "../actions";

const initialState = {
    user: null,
    isFetching: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUser: (state, action) => ({
            ...state,
            user: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getType(login.loginSuccess), (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                return {
                    user: action.payload,
                    isFetching: false,
                    error: false,
                };
            })
            .addCase(getType(login.loginFailure), (state, action) => ({
                user: null,
                isFetching: false,
                error: true,
            }));
    },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
