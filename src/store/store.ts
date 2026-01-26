import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { safeState } from './storage';

export const store = configureStore({
        reducer: {
                user: userSlice,
        },
});

store.subscribe(() => {
        safeState({ access_token: store.getState().user.accessToken }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
