import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import { HomePage } from './pages/HomePage/';
import { AboutPage } from './pages/AboutPage/';
import { Layout } from './pages/Layout/Layout.tsx';

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
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
