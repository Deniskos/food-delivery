import { useEffect, useState } from 'react';
import type { Product } from '../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../helpers/API';
import type { CartItem } from '../store/cart.slice';

export function useCartProducts(cartItems: CartItem[]) {
        const [products, setProducts] = useState<Product[]>([]);
        const [loading, setLoading] = useState(false);
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

        return { products, loading, error };
}
