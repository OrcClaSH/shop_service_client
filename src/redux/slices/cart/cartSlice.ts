import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCartFromLS, sumPrice } from '../../../utils';

import { TCartProducts, TCartState, TChangeCountPayload } from './types';

const { totalPrice, items } = getCartFromLS();

const initialState: TCartState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartProducts>) => {
      const findProduct = state.items.find(
        (item) => item.idProduct === action.payload.idProduct,
      );

      // eslint-disable-next-line no-unused-expressions
      findProduct ? (findProduct.count += 1) : state.items.push(action.payload);
      state.totalPrice = sumPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.idProduct !== action.payload);
      state.totalPrice = sumPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    changeCount: (state, action: PayloadAction<TChangeCountPayload>) => {
      const findProduct = state.items.find(
        (item) => item.idProduct === action.payload.idProduct,
      );

      if (findProduct && action.payload.change === '+') findProduct.count += 1;
      if (findProduct && action.payload.change === '-' && findProduct.count > 0)
        findProduct.count -= 1;
      state.totalPrice = sumPrice(state.items);
    },
  },
});

export const { addItem, removeItem, clearItems, changeCount } = cartSlice.actions;

export default cartSlice.reducer;
