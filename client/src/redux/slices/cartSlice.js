import { createSlice, current } from "@reduxjs/toolkit";
import { checkCart, getType } from "../actions";
import { cartApi } from "../../api";

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
            const newState = {
                products: [...current(state).products, action.payload.product],
                quantity: current(state).quantity + 1,
                total:
                    current(state).total + action.payload.product.sale
                        ? action.payload.product.sale *
                          action.payload.product.quantity
                        : action.payload.product.price *
                          action.payload.product.quantity,
            };
            if (newState.products.length > 1) {
                cartApi.update(newState, action.payload.user);
            } else {
                cartApi.create(newState, action.payload.user);
            }
            return newState;
        },
        removeProduct: (state, action) => {
            const newState = {
                products: current(state).products.filter(
                    (product) => product._id !== action.payload.product._id
                ),
                quantity: current(state).quantity - 1,
                total:
                    current(state).total -
                    action.payload.product.price *
                        action.payload.product.quantity,
            };
            cartApi.update(newState, action.payload.user);
            return newState;
        },
        clearProduct: (state, action) => {
            cartApi.update(initialState, action.payload.user);
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getType(checkCart.checkCartRequest), (state, action) => ({
                ...initialState,
            }))
            .addCase(getType(checkCart.checkCartSuccess), (state, action) => {
                const { userId, products, quantity, total } = action.payload;
                return { products, quantity, total };
            })
            .addCase(getType(checkCart.checkCartFailure), (state, action) => ({
                ...initialState,
            }));
    },
});

export const { addProduct, removeProduct, clearProduct } = cartSlice.actions;

export default cartSlice.reducer;
