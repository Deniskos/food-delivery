import { type ReactNode } from 'react';

import { Outlet } from 'react-router';
import styles from './styles.module.css';

export function AuthLayout(): ReactNode {
        return (
                <div className={styles['layout']}>
                        <div className={styles['logo']}>
                                <img src='/logo.svg' alt='Логотип' />
                        </div>
                        <div className={styles['content']}>
                                <Outlet />
                        </div>
                </div>
        );
}
