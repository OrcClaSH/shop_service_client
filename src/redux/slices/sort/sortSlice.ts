import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    sortMethods: {
        'популярности': 'rating',
        'цене': 'price',
        'алфавиту': 'title',
    },
    activeSortMethod: 'популярности',
};

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setActiveSortMethod: (state, action: PayloadAction<string>) => {
            state.activeSortMethod = action.payload;
        }
    }
});

export const { setActiveSortMethod } = sortSlice.actions;

export default sortSlice.reducer;
