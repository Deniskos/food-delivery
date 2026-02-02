import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import styles from './styles.module.css';

export function Cart() {
        return (
                <div className={styles['cart-root']}>
                        <Title>Корзина</Title>

                        <ul className={styles['cart-list']}>
                                <li className={styles['cart-item']}>
                                        <div className={styles['product-item-info']}>
                                                <div className={styles['image-wrapper']}>
                                                        <img
                                                                className={styles['product-image']}
                                                                src='./food3.png'
                                                                about='Изображение блюда'
                                                        />
                                                </div>
                                                <div className={styles['product-info-wrapper']}>
                                                        <span className={styles['product-name']}>
                                                                Аццки острая
                                                        </span>
                                                        <span className={styles['price']}>
                                                                320
                                                                <span
                                                                        className={
                                                                                styles[
                                                                                        'price-simbol'
                                                                                ]
                                                                        }
                                                                >
                                                                        {' '}
                                                                        &#8381;
                                                                </span>
                                                        </span>
                                                </div>
                                        </div>
                                        <div className={styles['product-item-controls']}>
                                                <span className={styles['decrement']}>-</span>
                                                <span className={styles['product-count']}>01</span>
                                                <span className={styles['increment']}>+</span>
                                                <span className={styles['delete']}>X</span>
                                        </div>
                                </li>
                                <li className={styles['cart-item']}>
                                        <div className={styles['product-item-info']}>
                                                <div className={styles['image-wrapper']}>
                                                        <img
                                                                className={styles['product-image']}
                                                                src='./food3.png'
                                                                about='Изображение блюда'
                                                        />
                                                </div>
                                                <div className={styles['product-info-wrapper']}>
                                                        <span className={styles['product-name']}>
                                                                Аццки острая
                                                        </span>
                                                        <span className={styles['price']}>
                                                                320
                                                                <span
                                                                        className={
                                                                                styles[
                                                                                        'price-simbol'
                                                                                ]
                                                                        }
                                                                >
                                                                        {' '}
                                                                        &#8381;
                                                                </span>
                                                        </span>
                                                </div>
                                        </div>
                                        <div className={styles['product-item-controls']}>
                                                <span className={styles['decrement']}>-</span>
                                                <span className={styles['product-count']}>01</span>
                                                <span className={styles['increment']}>+</span>
                                                <span className={styles['delete']}>X</span>
                                        </div>
                                </li>
                        </ul>

                        <div className={styles['promo-wrapper']}>
                                <Input kind='promo' placeholder='Промокод' />
                                <Button className={styles['promo-button']}>Применить</Button>
                        </div>

                        <ul className={styles['total-list']}>
                                <li className={styles['total-list__item']}>
                                        <span className={styles['total-list__item-title']}>
                                                Итог
                                        </span>
                                        <span className={styles['total-list__item-cost']}>
                                                640&nbsp;
                                                <span className={styles['rubl']}>&#8381;</span>
                                        </span>
                                </li>
                                <li className={styles['total-list__item']}>
                                        <span className={styles['total-list__item-title']}>
                                                Доставка
                                        </span>
                                        <span className={styles['total-list__item-cost']}>
                                                169&nbsp;
                                                <span className={styles['rubl']}>&#8381;</span>
                                        </span>
                                </li>

                                <li className={styles['total-list__item']}>
                                        <span className={styles['total-list__item-title']}>
                                                Итого
                                        </span>
                                        <span className={styles['total-list__item-cost']}>
                                                640&nbsp;
                                                <span className={styles['rubl']}>&#8381;</span>
                                        </span>
                                </li>
                        </ul>

                        <div className={styles['button-wrapper']}>
                                <Button type='submit' size='big'>
                                        Оформить
                                </Button>
                        </div>
                </div>
        );
}
