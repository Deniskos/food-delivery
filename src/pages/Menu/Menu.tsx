import axios from 'axios';
import { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import Title from '../../components/Title/Title';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import { MenuLIst } from './MenuList/MenuList';
import styles from './styles.module.css';

function Menu() {
        const [products, setProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | undefined>(undefined);

        const getMenu = async () => {
                try {
                        setIsLoading(true);
                        // await new Promise<void>(resolve => {
                        //         setTimeout(() => {
                        //                 resolve();
                        //         }, 2000);
                        // });
                        const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
                        setProducts(data);
                        setIsLoading(false);
                } catch (e) {
                        console.error(e);
                        setIsLoading(false);
                        if (axios.isAxiosError(e)) {
                                setError(e.message);
                        }
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
                                {error && error}
                                {isLoading && 'Загрузка меню...'}
                                {!isLoading && <MenuLIst products={products} />}
                        </div>
                </>
        );
}

export default Menu;
