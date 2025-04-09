import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { HomePage } from './pages/HomePage/';
import { AboutPage } from './pages/AboutPage/';
import { Layout } from './components/Layout';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { FavoritesPage } from './pages/FavoritesPage';

const router = createBrowserRouter([
  {
    path: '/ecommerce',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ':id',
            element: <ProductDetailsPage />,
          },
        ],
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
