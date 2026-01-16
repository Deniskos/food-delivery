import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

export const RequiredAuth = ({ children }: { children: ReactNode }) => {
        const jwt = localStorage.getItem('access_token');
        if (!jwt) {
                return <Navigate to='/auth/login' replace />;
        }

        return children;
};
