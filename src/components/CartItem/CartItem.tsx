import cn from 'classnames';
import { useDispatch } from 'react-redux';
import type { Product } from '../../interfaces/product.interface';
import { addProduct, decrementProduct, deleteProduct } from '../../store/cart.slice';
import styles from './styles.module.css';

interface CartItemProps {
        product: Product;
        count: number;
}

export const CartItem = ({ product, count }: CartItemProps) => {
        const dispatch = useDispatch();
        const { id } = product;

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
                                                src={`${product?.image}`}
                                                about='Изображение блюда'
                                        />
                                </div>
                                <div className={styles['product-info-wrapper']}>
                                        <span className={styles['product-name']}>
                                                {product?.name}
                                        </span>
                                        <span className={styles['price']}>
                                                {product?.price}
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
