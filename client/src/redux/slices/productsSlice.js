import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductsByCategory, getType } from "../actions";

const initialState = {
    products: [],
    isFetching: false,
    error: false,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getType(getProducts.request), (state, action) => ({
                products: [],
                isFetching: true,
                error: false,
            }))
            .addCase(getType(getProducts.success), (state, action) => ({
                products: action.payload,
                isFetching: false,
                error: false,
            }))
            .addCase(getType(getProducts.failure), (state, action) => ({
                products: null,
                isFetching: false,
                error: true,
            }))
            .addCase(
                getType(getProductsByCategory.getProductsByCategoryRequest),
                (state, action) => ({
                    ...state,
                    isFetching: true,
                    error: false,
                })
            )
            .addCase(
                getType(getProductsByCategory.getProductsByCategorySuccess),
                (state, action) => {
                    return {
                        products: action.payload,
                        isFetching: false,
                        error: false,
                    };
                }
            )
            .addCase(
                getType(getProductsByCategory.getProductsByCategoryFailure),
                (state, action) => ({
                    products: null,
                    isFetching: false,
                    error: true,
                })
            );
    },
});

export default productsSlice.reducer;
