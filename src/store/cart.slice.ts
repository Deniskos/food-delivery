import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
        id: number;
        count: number;
};

export interface CartState {
        products: CartItem[];
        totalProducts: number;
}

const initialState: CartState = {
        products: [],
        totalProducts: 0,
};

export const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
                addProduct: (state, action: PayloadAction<number>) => {
                        const { payload } = action;
                        const existed = state.products.find(item => item.id === payload);
                        state.totalProducts += 1; // при каждом добавлении товара увеличиваем totalProducts на 1
                        if (!existed) {
                                state.products.push({ id: payload, count: 1 });
                                return;
                        }

                        state.products = state.products.map(item => {
                                if (item.id === payload) {
                                        return { ...item, count: item.count + 1 };
                                }
                                return item;
                        });
                },
        },
});

export default cartSlice.reducer;
export const cardActions = cartSlice.actions;
