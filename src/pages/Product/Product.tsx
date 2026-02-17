import { useDispatch } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Rating from '../../components/Rating/Rating';
import Title from '../../components/Title/Title';
import type { Product } from '../../interfaces/product.interface';
import { addProduct } from '../../store/cart.slice';
import styles from './styles.module.css';

export function Product() {
        const dispatch = useDispatch();
        const { product } = useLoaderData() as { product: Product };
        const addToCart = () => {
                dispatch(addProduct(product.id));
        };

        return (
                <div className={styles['product-root']} autoFocus>
                        <div className={styles['header']}>
                                <Link
                                        to='/'
                                        className={styles['back-button']}
                                        style={{ backgroundImage: 'url(/arrow_back.svg)' }}
                                />
                                <Title>{product.name}</Title>
                                <Button onClick={addToCart} size='small' className='cart'>
                                        В корзину
                                </Button>
                        </div>
                        <div className={styles['product-card']}>
                                <div
                                        className={styles['product-img']}
                                        style={{ backgroundImage: `url(${product.image})` }}
                                ></div>
                                <div className={styles['product-info']}>
                                        <div className={styles['price-area']}>
                                                <span className={styles['info-title']}>Цена</span>
                                                <span className={styles['price']}>
                                                        {product.price}&nbsp;
                                                        <span className={styles['rub']}>
                                                                &#8381;
                                                        </span>
                                                </span>
                                        </div>

                                        <div className={styles['rating-area']}>
                                                <span className={styles['info-title']}>
                                                        Рейтинг
                                                </span>
                                                <Rating rating={product.rating} position='static' />
                                        </div>
                                        <div className={styles['compound-area']}>
                                                <span className={styles['compound-title']}>
                                                        Состав:
                                                </span>
                                                <ul className={styles['compound-list']}>
                                                        {product.ingredients?.map(i => (
                                                                <li className={styles['list-item']}>
                                                                        {i}
                                                                </li>
                                                        ))}
                                                </ul>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
