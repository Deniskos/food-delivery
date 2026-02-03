import axios from 'axios';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import { addProduct, decrementProduct, deleteProduct } from '../../store/cart.slice';
import styles from './styles.module.css';

interface CartItemProps {
        id: number;
        count: number;
}

export const CartItem = ({ id, count }: CartItemProps) => {
        const [productItem, setProductItem] = useState<Product>();
        const dispatch = useDispatch();

        useEffect(() => {
                getItem();
        }, [id]);

        const getItem = async () => {
                try {
                        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
                        setProductItem(data);
                } catch (e) {
                        console.error(e);
                }
        };

        const addToCart = () => {
                dispatch(addProduct(id));
        };

        const decrementInCart = () => {
                dispatch(decrementProduct(id));
        };

        const removeFromCart = () => {
                dispatch(deleteProduct(id));
        };
        return (
                <li className={styles['cart-item']}>
                        <div className={styles['product-item-info']}>
                                <div className={styles['image-wrapper']}>
                                        <img
                                                className={styles['product-image']}
                                                src={`${productItem?.image}`}
                                                about='Изображение блюда'
                                        />
                                </div>
                                <div className={styles['product-info-wrapper']}>
                                        <span className={styles['product-name']}>
                                                {productItem?.name}
                                        </span>
                                        <span className={styles['price']}>
                                                {productItem?.price}
                                                <span className={styles['price-simbol']}>
                                                        {' '}
                                                        &#8381;
                                                </span>
                                        </span>
                                </div>
                        </div>
                        <div className={styles['product-item-controls']}>
                                <button
                                        className={cn(styles['button'], styles['decrement'])}
                                        disabled={count === 0}
                                        onClick={decrementInCart}
                                >
                                        -
                                </button>
                                <span
                                        className={cn(styles['product-count'], {
                                                [styles['disabled']]: count === 0,
                                        })}
                                >
                                        {' '}
                                        {count}
                                </span>
                                <button
                                        className={cn(styles['button'], styles['increment'])}
                                        onClick={addToCart}
                                >
                                        +
                                </button>
                                <button
                                        className={cn(styles['button'], styles['delete'])}
                                        onClick={removeFromCart}
                                >
                                        X
                                </button>
                        </div>
                </li>
        );
};
