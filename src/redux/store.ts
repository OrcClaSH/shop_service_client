import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import cartReducer from './slices/cart/cartSlice';
import categoryReducer from './slices/category/categorySlice';
import paginationReducer from './slices/pagination/paginationSlice';
import ProductsReducer from './slices/product/productsSlice';
import searchReducer from './slices/search/searchSlice';
import sortReducer from './slices/sort/sortSlice';
import userReducer from './slices/user/userSlice';

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
