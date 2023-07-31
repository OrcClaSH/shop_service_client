/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from './store';

const selectCart = (state: TRootState) => state.cart;

export const selectorCart = createSelector([selectCart], (cart) => cart);

export const selectorCartById = (id: number) =>
  createSelector([selectCart], (cart) => cart.items.filter((item) => item.id === id));

const selectCategory = (state: TRootState) => state.category;

export const selectorCategory = createSelector([selectCategory], (category) => category);

const selectPagination = (state: TRootState) => state.pagination;

export const selectorPagination = createSelector(
  [selectPagination],
  (pagination) => pagination,
);

const selectProducts = (state: TRootState) => state.products;

export const selectorProducts = createSelector([selectProducts], (products) => products);

const selectSort = (state: TRootState) => state.sort;

export const selectorSort = createSelector([selectSort], (sort) => sort);

const selectSearch = (state: TRootState) => state.search;

export const selectorSearch = createSelector([selectSearch], (search) => search);

const selectUser = (state: TRootState) => state.user;

export const selectorUser = createSelector([selectUser], (user) => user);
