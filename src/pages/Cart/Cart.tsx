import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { CartItem } from '../../components/CartItem/CartItem';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import type { RootState } from '../../store/store';
import { DELIVERY_COST } from './constants';
import styles from './styles.module.css';

export function Cart() {
        const cartItems = useSelector((store: RootState) => store.card.products);
        const [products, setProducts] = useState<Product[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
                const fetchProducts = async () => {
                        if (cartItems.length === 0) {
                                setProducts([]);
                                return;
                        }

                        setLoading(true);
                        setError(null);

                        try {
                                // Создаем массив промисов
                                const promises = cartItems.map(item =>
                                        axios.get<Product>(`${PREFIX}/products/${item.id}`)
                                );

                                // Ждем выполнения всех запросов
                                const responses = await Promise.all(promises);

                                // Извлекаем данные из ответов
                                const productsData = responses.map(response => response.data);

                                setProducts(productsData);
                        } catch (err) {
                                setError('Не удалось загрузить товары');
                                console.error('Ошибка загрузки товаров:', err);
                        } finally {
                                setLoading(false);
                        }
                };

                fetchProducts();
        }, [cartItems]);

        // Вычисляем итоговую стоимость товаров в корзине
        const totalProductCost = products.reduce((sum, product) => {
                const cartItem = cartItems.find(item => item.id === product.id);
                return sum + product.price * (cartItem?.count || 0);
        }, 0);

        const finalPrice = totalProductCost ? totalProductCost + DELIVERY_COST : 0;

        if (loading) {
                return <div>Загрузка корзины...</div>;
        }

        if (error) {
                return <div className={styles.error}>{error}</div>;
        }
        return (
                <div className={styles['cart-root']}>
                        <Title>Корзина</Title>

                        <ul className={styles['cart-list']}>
                                {products.map(item => {
                                        const count =
                                                cartItems.find(i => i.id === item.id)?.count ?? 0;
                                        return (
                                                <CartItem
                                                        key={item.id}
                                                        product={item}
                                                        count={count}
                                                />
                                        );
                                })}
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
                                                {totalProductCost}&nbsp;
                                                <span className={styles['rubl']}>&#8381;</span>
                                        </span>
                                </li>
                                <li className={styles['total-list__item']}>
                                        <span className={styles['total-list__item-title']}>
                                                Доставка
                                        </span>
                                        <span className={styles['total-list__item-cost']}>
                                                {totalProductCost && DELIVERY_COST}&nbsp;
                                                <span className={styles['rubl']}>&#8381;</span>
                                        </span>
                                </li>

                                <li className={styles['total-list__item']}>
                                        <span className={styles['total-list__item-title']}>
                                                Итого
                                        </span>
                                        <span className={styles['total-list__item-cost']}>
                                                {finalPrice}&nbsp;
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
