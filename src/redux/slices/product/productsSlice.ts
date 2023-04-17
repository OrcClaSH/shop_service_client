import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TFetchProducts, TProduct, TProductsState } from "./types";

const initialState: TProductsState = {
    products: [],
    isLoading: true,
    productsNumber: 0,
    error: '',
};

export const fetchProducts = createAsyncThunk<TFetchProducts, string, { rejectValue: string }>(
    'products/fetchProducts',
    async function (urlResult, { rejectWithValue }) {
        const response = await axios.get(urlResult);

        if (response.status !== 200) {
            return rejectWithValue('Проблемы с получением данных, попробуйте позже')
        }

        const products: TProduct[] = response.data.products;
        const productsNumber = response.data.count;

        return { products, productsNumber };
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<TFetchProducts>) => {
                state.products = action.payload.products;
                state.productsNumber = Number(action.payload.productsNumber);
                state.isLoading = false;
                state.error = '';
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            })
            // .addMatcher(isError, (state, action) => {
            //     state.isLoading = false;
            //     state.error = action.error.message;
            //     console.log('action.error.message', action.error.message)
            // })
    },
});

export default productsSlice.reducer;
