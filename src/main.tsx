import axios from 'axios';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { PREFIX } from './helpers/API.ts';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RequiredAuth } from './helpers/RequiredAuth.tsx';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Login } from './pages/Login/Login.tsx';
import { Product } from './pages/Product/Product.tsx';
import { Register } from './pages/Register/Register.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
        {
                path: '/',
                element: (
                        <RequiredAuth>
                                <Layout />
                        </RequiredAuth>
                ),
                children: [
                        {
                                path: '/',
                                element: (
                                        <Suspense fallback={<>Загрузка...</>}>
                                                <Menu />
                                        </Suspense>
                                ),
                        },
                        {
                                path: '/cart',
                                element: <Cart />,
                        },
                        {
                                path: '/product/:id',
                                element: (
                                        <Suspense fallback={<>Загрузка...</>}>
                                                <Product />
                                        </Suspense>
                                ),
                                errorElement: <>Ошибка</>,
                                loader: async ({ params }) => {
                                        const response = await axios.get(
                                                `${PREFIX}/products/${params.id}`
                                        );
                                        return { product: response.data };
                                },
                        },
                        {
                                path: '*',
                                element: <Error />,
                        },
                ],
        },
        {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                        {
                                path: 'login',
                                element: <Login />,
                        },
                        {
                                path: 'register',
                                element: <Register />,
                        },
                ],
        },
]);

createRoot(document.getElementById('root')!).render(
        <StrictMode>
                <RouterProvider router={router} />
        </StrictMode>
);
