import axios from 'axios';
import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PREFIX } from './helpers/API.ts';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { Product as ProductType } from './interfaces/product.interface.ts';
import { Layout } from './layout/Menu/Layout.tsx';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Product } from './pages/Product/Product.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
        {
                path: '/',
                element: <Layout />,
                children: [
                        {
                                path: '/',
                                element: <Menu />,
                        },
                        {
                                path: '/cart',
                                element: <Cart />,
                        },
                        {
                                path: '/product/:id',
                                element: <Product />,
                                errorElement: <>Ошибка</>,
                                loader: async ({ params }) => {
                                        await new Promise<void>(resolve => {
                                                setTimeout(() => {
                                                        resolve();
                                                }, 2000);
                                        });
                                        const { data } = await axios.get<ProductType>(
                                                `${PREFIX}/products/${params.id}`
                                        );
                                        return data;
                                },
                        },
                        {
                                path: '*',
                                element: <Error />,
                        },
                ],
        },
]);

createRoot(document.getElementById('root')!).render(
        <StrictMode>
                <RouterProvider router={router} />
        </StrictMode>
);
