import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import type { LoginResponse } from '../interfaces/auth.interface';
import { PREFIX } from '../helpers/API';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
        access_token: string | null;
}

export interface UserState {
        accessToken: string | null;
        loginErrorMessage?: string;
        loginState: null | 'rejected';
}

const initialState: UserState = {
        accessToken: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.access_token ?? null,
        loginState: null,
};

export const login = createAsyncThunk(
        'user/login',
        async (params: { email: string; password: string }) => {
                try {
                        const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                                email: params.email,
                                password: params.password,
                        });
                        return data;
                } catch (e) {
                        if (e instanceof AxiosError) {
                                throw new Error(e.response?.data.message);
                        }
                }
        }
);

export const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
                // addAccessToken: (state, action: PayloadAction<string>) => {
                //         const { payload } = action;
                //         state.accessToken = payload;
                // },
                clearErrorMessage: state => {
                        state.loginErrorMessage = undefined;
                },
                userLogout: state => {
                        state.accessToken = null;
                },
        },
        extraReducers: builder => {
                builder.addCase(login.fulfilled, (state, action) => {
                        if (!action.payload) {
                                return;
                        }
                        state.accessToken = action.payload?.access_token;
                });
                builder.addCase(login.rejected, (state, action) => {
                        state.loginErrorMessage = action?.error.message;
                        state.loginState = 'rejected';
                });
        },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
