import { useDispatch, useSelector } from 'react-redux';
import { orderApi } from '../api/orderApi';
import { useNavigate } from 'react-router';
import { clearCart } from '../store/cart.slice';
import type { RootState } from '../store/store';

export const useOrder = () => {
        const cartItems = useSelector((store: RootState) => store.cart.products);
        const accessToken = useSelector((store: RootState) => store.user.accessToken);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const createOrder = async () => {
                const result =
                        !!accessToken &&
                        (await orderApi.createOrderRequest(cartItems, accessToken));
                if (result.status == 'new') {
                        dispatch(clearCart());
                        navigate('/success');
                }
        };
        return { createOrder };
};
