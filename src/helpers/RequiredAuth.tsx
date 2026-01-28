import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import type { RootState } from '../store/store';

export const RequiredAuth = ({ children }: { children: ReactNode }) => {
        const accessToken = useSelector((store: RootState) => store.user.accessToken);
        if (!accessToken) {
                return <Navigate to='/auth/login' replace />;
        }

        return children;
};
