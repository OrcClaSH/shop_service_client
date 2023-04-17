import { AnyAction } from "@reduxjs/toolkit";

import { API_URL } from '../http';
import { TRootState } from "redux/store";
import { TCartProducts, TCartState } from "redux/slices/cart/types";

export const urlBase = `${API_URL}/products`;

export const makeUrl = (rootState: TRootState) => {
    const urlMain = `${urlBase}?`
    const { categories, activeCategory } = rootState.category;
    const { sortMethods, activeSortMethod } = rootState.sort;
    const { page, itemsPerPage } = rootState.pagination;
    const searchValue = rootState.search.value;
    const activeCategoryCode = categories[activeCategory as keyof typeof categories]
    const urlCategory = activeCategoryCode ? `&category=${activeCategoryCode}` : ''
    const urlSort = `&_sort=${sortMethods[activeSortMethod as keyof typeof sortMethods]}`;
    const urlSearch = searchValue.length > 1 ? `&title_like=${searchValue}` : ''
    const urlLimit = itemsPerPage ? `&_limit=${itemsPerPage}` : ''
    const urlPage = `&_page=${page}`
    const urlResult = urlMain + urlCategory + urlSort + urlSearch + urlLimit + urlPage;

    return urlResult;
};

export const sumPrice = (items: TCartProducts[]) => {
    return items.reduce((sum, obj) => sum + (obj.price * obj.count), 0);
};

export const sumProducts = (items: TCartProducts[]) => {
    return items.reduce((sum, obj) => sum + obj.count, 0);
};

export const countProductId = (items: TCartProducts[], id: number) => {
    const countResult = items.reduce((sum, item) => {
        if (item.id === id) {
            return sum + item.count;
        }
        return 0;
    }, 0)
    return countResult;
};

export const getCartFromLS = () => {
    const cartItems = localStorage.getItem('cartItems');
    const totalPrice = localStorage.getItem('cartTotalPrice');
    return {
        items: cartItems ? JSON.parse(cartItems) : [],
        totalPrice: totalPrice ? +totalPrice : 0,
    } as TCartState;
};

export function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
};
