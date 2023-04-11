import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slices/category/categorySlice';
import sortReducer from './slices/sort/sortSlice';
import searchReducer from './slices/search/searchSlice';
import paginationReducer from './slices/pagination/paginationSlice';
import ProductsReducer from './slices/product/productsSlice';
import cartReducer from './slices/cart/cartSlice';
import userReducer from './slices/user/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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
