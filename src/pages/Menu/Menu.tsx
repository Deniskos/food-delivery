import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import Title from '../../components/Title/Title';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../product.interface';
import styles from './styles.module.css';

export function Menu() {
        const [products, setProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);

        console.log('isLoading', isLoading);

        const getMenu = async () => {
                try {
                        setIsLoading(true);
                        await new Promise<void>(resolve => {
                                setTimeout(() => {
                                        resolve();
                                }, 2000);
                        });
                        const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
                        setProducts(data);
                        setIsLoading(false);
                } catch (e) {
                        console.error(e);
                        setIsLoading(false);
                        return;
                }
        };

        useEffect(() => {
                getMenu();
        }, []);

        return (
                <>
                        <div className={styles.header}>
                                <Title>Меню</Title>
                                <Search placeholder='Введите блюдо или состав' />
                        </div>
                        <div className={styles['products']}>
                                {isLoading && 'Загрузка меню...'}
                                {!isLoading &&
                                        products.map(product => (
                                                <ProductCard
                                                        key={product.id}
                                                        id={product.id}
                                                        title={product.name}
                                                        description={product.ingredients.join(', ')}
                                                        image={product.image}
                                                        price={product.price}
                                                        rating={product.rating}
                                                />
                                        ))}
                        </div>
                </>
        );
}
