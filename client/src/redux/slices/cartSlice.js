import { createSlice, current } from "@reduxjs/toolkit";
import { checkCart, getType } from "../actions";
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
                cartAPI.update(newState, action.payload.user);
            } else {
                cartAPI.create(newState, action.payload.user);
            }
            return newState;
        },
        removeProduct: (state, action) => {
            console.log("action.payload.product", action.payload.product);
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
            cartAPI.update(newState, action.payload.user);
            return newState;
        },
        clearProduct: (state, action) => {
            cartAPI.update(initialState, action.payload.user);
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
            .addCase(
                getType(checkCart.checkCartFailure),
                (state, action) => {}
            );
    },
});

export const { addProduct, removeProduct, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
