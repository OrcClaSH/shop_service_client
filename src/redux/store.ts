import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import sortReducer from './slices/sort/sortSlice';
import cartReducer from './slices/cart/cartSlice';
import userReducer from './slices/user/userSlice';
import searchReducer from './slices/search/searchSlice';
import ProductsReducer from './slices/product/productsSlice';
import categoryReducer from './slices/category/categorySlice';
import paginationReducer from './slices/pagination/paginationSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        sort: sortReducer,
        search: searchReducer,
        pagination: paginationReducer,
        products: ProductsReducer,
        cart: cartReducer,
        user: userReducer,
    },
});

export type TRootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
