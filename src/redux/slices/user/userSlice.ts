import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AuthService from 'services/AuthService';
import { IUser, IAuthResponse, IUserState } from './types';

interface IArgs {
    email: string;
    password: string;
};

const initialState: IUserState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: '',
};

export const registration = createAsyncThunk<IAuthResponse, IArgs, { rejectValue: string }>(
    'user/registration',
    async function (args, { rejectWithValue }) {
        const { email, password } = args;
        try {
            const response = await AuthService.registration(email, password);
            return response.data;
        } catch (error: any) {
            // console.log('error', error)
            return rejectWithValue(error?.response?.data?.message || `Проблемы с получением данных пользователя`);
        }
    }
);

export const login = createAsyncThunk<IAuthResponse, IArgs, { rejectValue: string }>(
    'user/login',
    async function (args, { rejectWithValue }) {
        const { email, password } = args;
        try {
            const response = await AuthService.login(email, password);
            return response.data;
        } catch (error: any) {
            // console.log('error', error)
            return rejectWithValue(error?.response?.data?.message || `Проблемы с получением данных пользователя`);
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async function () {
        try {
            await AuthService.logout();
        } catch (e) {
            throw new Error('Проблемы с корректным выходом пользователя')
        }
    }
);

export const checkAuth = createAsyncThunk<IAuthResponse, void, { rejectValue: string }>(
    'user/checkAuth',
    async function (_, { rejectWithValue }) {
        const response = await AuthService.refresh();
        if (response.status !== 200) {
            return rejectWithValue('Проблемы с обновление токена пользователя')
        }
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.error = '';
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || '';
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.error = '';
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || '';
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.removeItem('token');
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = 'ERROR logout' //TODO
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.error = '';
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            })
    }
});

export default userSlice.reducer;
