import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { CartItem } from '../../components/CartItem/CartItem';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import type { RootState } from '../../store/store';
import styles from './styles.module.css';

export function Cart() {
        const cartItems = useSelector((store: RootState) => store.card.products);
        return (
                <div className={styles['cart-root']}>
                        <Title>Корзина</Title>

                        <ul className={styles['cart-list']}>
                                {cartItems.map(item => (
                                        <CartItem key={item.id} id={item.id} count={item.count} />
                                ))}
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
