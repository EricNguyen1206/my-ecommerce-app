import { createSlice } from "@reduxjs/toolkit";
import { checkCart, createCart, getType } from "../actions";

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
            // let { prd, qtt, ttl } = state;
            state.products.push(action.payload.product);
            state.quantity += 1;
            state.total +=
                action.payload.product.price * action.payload.product.quantity;
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
                initialState,
            }))
            .addCase(getType(checkCart.checkCartSuccess), (state, action) => {
                const quantity = action.payload.products.reduce();
                return {
                    products: action.payload.products,
                    quantity: false,
                    total: false,
                };
            })
            .addCase(getType(checkCart.checkCartFailure), (state, action) => ({
                initialState,
            }))
            .addCase(
                getType(createCart.createCartRequest),
                (state, action) => ({
                    cart: null,
                    isFetching: true,
                    error: false,
                })
            )
            .addCase(getType(createCart.createCartSuccess), (state, action) => {
                return {
                    cart: action.payload,
                    isFetching: false,
                    error: false,
                };
            })
            .addCase(
                getType(createCart.createCartFailure),
                (state, action) => ({
                    cart: null,
                    isFetching: false,
                    error: true,
                })
            );
    },
});

export const { addProduct, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
