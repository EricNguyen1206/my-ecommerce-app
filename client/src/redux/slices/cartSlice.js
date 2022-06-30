import { createSlice } from "@reduxjs/toolkit";
import { checkCart, createCart, getType } from "../actions";
import { cartAPI } from "../../api";

const initialState = {
    products: [],
    quantity: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload.product);
            state.quantity += 1;
            state.total +=
                action.payload.product.price * action.payload.product.quantity;
            if (state.products.length > 1) {
                cartAPI.update(state);
            } else {
                cartAPI.create(
                    state,
                    action.payload.user._id,
                    action.payload.user.accessToken
                );
            }
        },
        clearProduct: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getType(checkCart.checkCartRequest), (state, action) => ({
                ...initialState,
            }))
            .addCase(getType(checkCart.checkCartSuccess), (state, action) => {
                return {
                    products: action.payload.products,
                    quantity: false,
                    total: false,
                };
            })
            .addCase(getType(checkCart.checkCartFailure), (state, action) => ({
                ...initialState,
            }));
    },
});

export const { addProduct, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
