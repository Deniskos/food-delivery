import { Link, Outlet } from 'react-router-dom';

import styles from './styles.module.css';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import type { ReactNode } from 'react';

export function Layout(): ReactNode {
	return (
		<div className={styles.root}>			
			<div className={styles.sidebar}>				
				<div className={styles.sidebarTop}>
					<div className={styles.profile}>
						<div className={styles.avatar}></div>
						<div className={styles.name}>Денис Кострыгин</div>
						<div className={styles.email}>kostryginden@mail.ru</div>
					</div>
					<div className={styles.navigation}>
						<Link className={cn(styles.link, styles.menuLink)} to='/'>Меню</Link>
						<Link className={cn(styles.link, styles.cartLink)} to='/cart'>Корзина<span className={styles.cartCount}>2</span></Link>
					</div>
				</div>	
				<div className={styles.sidebarBottom}>
					<Button size="small" className='exit'>Выйти</Button>
				</div>
			</div>
			<div className={styles.main}>
				<Outlet />
			</div>
		</div>
	);
}