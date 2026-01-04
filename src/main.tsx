import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './layout/Menu/Layout.tsx'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
import { Menu } from './pages/Menu/Menu'
import { Product } from './pages/Product/Product.tsx'

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
                        },
                        {
                                path: '*',
                                element: <Error />,
                        },
                ],
        },
])

createRoot(document.getElementById('root')!).render(
        <StrictMode>
                <RouterProvider router={router} />
        </StrictMode>
)
