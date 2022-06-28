import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "./apiCall";

export const getProducts = createAsyncThunk("product/get", async () => {
    const response = await productsApi.get();
    return response;
});

export const addProduct = createAsyncThunk("product/add", async (product) => {
    const response = await productsApi.add(product);
    return response;
});

export const updateProduct = createAsyncThunk(
    "product/update",
    async (product) => {
        const response = await productsApi.update(product);
        return response;
    }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
    const response = await productsApi.delete(id);
    return response;
});

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isFetching = true;
                state.error = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isFetching = false;
            })
            .addCase(getProducts.rejected, (state) => {
                state.isFetching = false;
                state.error = true;
            })
            .addCase(addProduct.pending, (state) => {
                state.isFetching = true;
                state.error = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isFetching = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state) => {
                state.isFetching = false;
                state.error = true;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isFetching = true;
                state.error = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isFetching = false;
                state.products[
                    state.products.findIndex(
                        (item) => item._id === action.payload.id
                    )
                ] = action.payload.product;
            })
            .addCase(updateProduct.rejected, (state) => {
                state.isFetching = false;
                state.error = true;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isFetching = true;
                state.error = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isFetching = false;
                state.products.splice(
                    state.products.findIndex(
                        (item) => item._id === action.payload
                    ),
                    1
                );
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.isFetching = false;
                state.error = true;
            });
    },
});

export default productSlice.reducer;
