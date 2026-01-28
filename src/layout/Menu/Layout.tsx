import { useEffect, type ReactNode } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getProfile, userActions } from '../../store/user.slice';

import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import type { AppDispatch, RootState } from '../../store/store';
import styles from './styles.module.css';

export function Layout(): ReactNode {
        const dispatch = useDispatch<AppDispatch>();
        const { email, name } = useSelector((state: RootState) => state.user.profile) || {};
        const { totalProducts } = useSelector((state: RootState) => state.card);
        const navigate = useNavigate();
        const { userLogout } = userActions;

        useEffect(() => {
                dispatch(getProfile());
        }, [dispatch]);

        const logout = () => {
                dispatch(userLogout());
                // localStorage.removeItem('access_token');
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
                                                {name && <div className={styles.name}>{name}</div>}
                                                {email && (
                                                        <div className={styles.email}>{email}</div>
                                                )}
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
                                                        <span className={styles.cartCount}>
                                                                {totalProducts}
                                                        </span>
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
