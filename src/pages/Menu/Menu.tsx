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

        const getMenu = async () => {
                try {
                        const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
                        setProducts(data);
                } catch (e) {
                        console.error(e);
                        return;
                }
                // try {
                //         const res = await fetch(`${PREFIX}/pro ducts`)
                //         if (!res.ok) {
                //                 return
                //         }
                //         const data = (await res.json()) as Product[]
                //         setProducts(data)
                // } catch (e) {
                //         console.error(e)
                //         return
                // }
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
                        {products.map(product => (
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
                </>
        );
}
