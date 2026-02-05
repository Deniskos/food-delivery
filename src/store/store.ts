import { configureStore } from '@reduxjs/toolkit';
import userSlice, { PERSISTENT_STATE } from './user.slice';
import cartSlice from './cart.slice';
import { safeState } from './storage';

export const store = configureStore({
        reducer: {
                user: userSlice,
                cart: cartSlice,
        },
});

store.subscribe(() => {
        safeState(
                {
                        access_token: store.getState().user.accessToken,
                        products: store.getState().cart.products,
                        totalProducts: store.getState().cart.totalProducts,
                        // profile: store.getState().user.profile,
                },
                PERSISTENT_STATE
        );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
