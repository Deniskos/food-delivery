import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import cartSlice from './cart.slice';
import { safeState } from './storage';

export const store = configureStore({
        reducer: {
                user: userSlice,
                card: cartSlice,
        },
});

store.subscribe(() => {
        safeState(
                {
                        access_token: store.getState().user.accessToken,
                        // profile: store.getState().user.profile,
                },
                JWT_PERSISTENT_STATE
        );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
