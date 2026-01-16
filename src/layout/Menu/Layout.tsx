import { type ReactNode } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import cn from 'classnames';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';

export function Layout(): ReactNode {
        const navigate = useNavigate();
        const logout = () => {
                localStorage.removeItem('access_token');
                navigate('/auth/login');
        };

        return (
                <div className={styles.layout}>
                        <div className={styles.sidebar}>
                                <div className={styles.sidebarTop}>
                                        <div className={styles.profile}>
                                                <div className={styles.avatar}>
                                                        <img
                                                                src='./ava.png'
                                                                alt='Аватар пользователя'
                                                        />
                                                </div>
                                                <div className={styles.name}>Денис Кострыгин</div>
                                                <div className={styles.email}>
                                                        kostryginden@mail.ru
                                                </div>
                                        </div>
                                        <div className={styles.navigation}>
                                                <NavLink
                                                        className={({ isActive }) =>
                                                                cn(styles.link, styles.menuLink, {
                                                                        [styles.active]: isActive,
                                                                })
                                                        }
                                                        to='/'
                                                >
                                                        Меню
                                                </NavLink>
                                                <NavLink
                                                        className={({ isActive }) =>
                                                                cn(styles.link, styles.cartLink, {
                                                                        [styles.active]: isActive,
                                                                })
                                                        }
                                                        to='/cart'
                                                >
                                                        Корзина
                                                        <span className={styles.cartCount}>2</span>
                                                </NavLink>
                                        </div>
                                </div>
                                <div className={styles.sidebarBottom}>
                                        <Button onClick={logout} size='small' className='exit'>
                                                Выйти
                                        </Button>
                                </div>
                        </div>
                        <div className={styles.main}>
                                <Outlet />
                        </div>
                </div>
        );
}
