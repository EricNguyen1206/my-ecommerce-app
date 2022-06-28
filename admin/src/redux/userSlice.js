import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apiCall";

export const login = createAsyncThunk("user/login", async (account) => {
    const response = await authApi.login(account);
    return response;
});

const initialState = {
    user: null,
    isFetching: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.user = null;
                state.isFetching = true;
                state.error = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("action", action);
                state.user = action.payload;
                state.isFetching = false;
                state.error = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.isFetching = false;
                state.error = true;
            });
    },
});

export default userSlice.reducer;
