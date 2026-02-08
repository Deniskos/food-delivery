import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../../store/cart.slice';
import type { AppDispatch } from '../../store/store';
import type { ProductCardProps } from './ProductCard.props';
import styles from './styles.module.css';

function ProductCard(props: ProductCardProps) {
        const dispatch = useDispatch<AppDispatch>();

        const addToCart = () => {
                dispatch(addProduct(props.id));
        };

        return (
                <div className={styles['card']}>
                        <button className={cn(styles['cartButton'])} onClick={addToCart}>
                                <img src='./cart-icon-light.svg' alt='Добавить в корзину' />
                        </button>
                        <Link to={`/product/${props.id}`} className={styles['link_wrapper']}>
                                <div className={styles['price']}>
                                        {props.price}&nbsp;
                                        <span className={styles['rub']}> &#8381;</span>
                                </div>

                                <div className={styles['dish-img-wrapper']}>
                                        <img src={props.image} alt='Изображение блюда' />
                                </div>

                                <div className={styles['text-wrapper']}>
                                        <h3 className={styles['dish-name']}>{props.title}</h3>
                                        <p className={styles['description']}>{props.description}</p>

                                        <div className={styles['rating']}>
                                                {props.rating}
                                                <img src='./star.svg' alt='Изображение звезды' />
                                        </div>
                                </div>
                        </Link>
                </div>
        );
}

export default ProductCard;
