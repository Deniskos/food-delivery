import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

export const RequiredAuth = ({ children }: { children: ReactNode }) => {
        const jwt = 'false';
        if (!jwt) {
                return <Navigate to='/auth/login' replace />;
        }

        return children;
};
