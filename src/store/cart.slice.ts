import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { PERSISTENT_STATE } from './user.slice';

export type CartItem = {
        id: number;
        count: number;
};

export interface CartState {
        products: CartItem[];
        totalProducts: number;
}

const initialState: CartState = {
        products: loadState<CartState>(PERSISTENT_STATE)?.products ?? [],
        totalProducts: loadState<CartState>(PERSISTENT_STATE)?.totalProducts ?? 0,
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
                decrementProduct: (state, action: PayloadAction<number>) => {
                        const { payload } = action;
                        state.totalProducts -= 1; // при каждом удалении товара уменьшаем totalProducts на 1
                        state.products = state.products.map(item => {
                                if (item.id === payload) {
                                        return { ...item, count: item.count - 1 };
                                }
                                return item;
                        });
                },
                deleteProduct: (state, action: PayloadAction<number>) => {
                        const { payload } = action;
                        state.products = state.products.filter(item => {
                                return item.id !== payload;
                        });
                        const totalProducts = state.products.reduce(
                                (acc, product) => acc + product.count,
                                0
                        );
                        state.totalProducts = totalProducts;
                },
                clearCart: state => {
                        state.products = [];
                        state.totalProducts = 0;
                },
        },
});

export default cartSlice.reducer;
export const { addProduct, decrementProduct, deleteProduct, clearCart } = cartSlice.actions;
