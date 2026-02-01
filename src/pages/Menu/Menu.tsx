import axios from 'axios';
import { useEffect, useState, type ChangeEvent } from 'react';
import Search from '../../components/Search/Search';
import Title from '../../components/Title/Title';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import { MenuLIst } from './MenuList/MenuList';
import styles from './styles.module.css';

function Menu() {
        const [products, setProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | undefined>();
        const [filter, setFilter] = useState<string>();

        console.log('filter', filter);

        useEffect(() => {
                if (filter && filter.length > 2) {
                        getMenu(filter);
                        return;
                }
                getMenu();
        }, [filter]);

        const getMenu = async (name?: string) => {
                try {
                        setIsLoading(true);
                        const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                                params: {
                                        name,
                                },
                        });
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

        const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
                const searchString = e.target.value;
                if (searchString.length > 2 || searchString.length === 0) {
                        setFilter(searchString);
                }
        };

        return (
                <>
                        <div className={styles.header}>
                                <Title>Меню</Title>
                                <Search
                                        placeholder='Введите блюдо или состав'
                                        onChange={changeFilter}
                                />
                        </div>
                        <div className={styles['products']}>
                                {error && error}
                                {isLoading && 'Загрузка меню...'}
                                {!isLoading && products.length > 0 && (
                                        <MenuLIst products={products} />
                                )}
                                {!isLoading && products.length === 0 && (
                                        <div>
                                                Блюд по данному запросу не найдено, попробуйте
                                                изменить запрос.
                                        </div>
                                )}
                        </div>
                </>
        );
}

export default Menu;
