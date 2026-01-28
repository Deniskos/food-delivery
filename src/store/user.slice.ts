import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import type { LoginResponse } from '../interfaces/auth.interface';
import { PREFIX } from '../helpers/API';
import type { Profile } from '../interfaces/user.interface';
import type { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
        access_token: string | null;
        profile: Profile | undefined;
}

export interface UserState {
        accessToken: string | null;
        loginErrorMessage?: string;
        registerErrorMessage?: string;
        profile?: Profile;
        // loginState: null | 'rejected';
}

const initialState: UserState = {
        accessToken: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.access_token ?? null,
};

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
        'user/getProfile',
        async (_, thunkApi) => {
                const accessToken = thunkApi.getState().user.accessToken;
                const response = await axios.get<Profile>(`${PREFIX}/user/profile`, {
                        headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                        },
                });

                return response.data;
        }
);

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

export const register = createAsyncThunk(
        'user/register',
        async (params: { email: string; password: string; name: string }) => {
                try {
                        const { data } = await axios.post<LoginResponse>(
                                `${PREFIX}/auth/register`,
                                {
                                        email: params.email,
                                        password: params.password,
                                        name: params.name,
                                }
                        );
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
                        state.registerErrorMessage = undefined;
                },
                userLogout: state => {
                        state.accessToken = null;
                        state.profile = undefined;
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
                });
                builder.addCase(getProfile.fulfilled, (state, action) => {
                        state.profile = action.payload;
                });
                builder.addCase(register.fulfilled, (state, action) => {
                        console.log('action', action);
                        if (!action.payload) {
                                return;
                        }
                        state.accessToken = action.payload.access_token;
                });
                builder.addCase(register.rejected, (state, action) => {
                        state.registerErrorMessage = action.error.message;
                });
        },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
