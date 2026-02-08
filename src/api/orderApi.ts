import axios from 'axios';
import { PREFIX } from '../helpers/API';
import type { CartItem } from '../store/cart.slice';

export const orderApi = {
        createOrderRequest: async (cartItems: CartItem[], accessToken: string) => {
                try {
                        const response = await axios.post(
                                `${PREFIX}/order/`,
                                {
                                        products: cartItems,
                                },
                                {
                                        headers: {
                                                Authorization: `Bearer ${accessToken}`,
                                                'Content-Type': 'application/json',
                                        },
                                }
                        );
                        return response.data;
                } catch (error) {
                        throw error;
                }
        },
};
