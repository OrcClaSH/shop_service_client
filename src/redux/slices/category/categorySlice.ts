import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    categories: {
        'Все': 0,
        'Термобумага': 1,
        'Офсет': 2,
    },
    activeCategory: 'Все',
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setActiveCategory: (state, action: PayloadAction<string>) => {
            state.activeCategory = action.payload
        },
    }
});

export const { setActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
