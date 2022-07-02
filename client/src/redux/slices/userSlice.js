import { createSlice } from "@reduxjs/toolkit";
import { login, loadUser, getType } from "../actions";

const initialState = {
    user: null,
    isFetching: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("user");
            return {
                ...initialState,
            };
        },
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
                ...state,
                isFetching: false,
                error: true,
            }))
            .addCase(getType(loadUser.loadUserSuccess), (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                return {
                    user: action.payload,
                    isFetching: false,
                    error: false,
                };
            })
            .addCase(
                getType(loadUser.loadUserFailure),
                (state, action) => initialState
            );
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
