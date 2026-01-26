import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
        access_token: string | null;
}

export interface UserState {
        accessToken: string | null;
}

const initialState: UserState = {
        accessToken: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.access_token ?? null,
};

export const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
                addAccessToken: (state, action: PayloadAction<string>) => {
                        const { payload } = action;
                        state.accessToken = payload;
                },
                userLogout: state => {
                        state.accessToken = null;
                },
        },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
