import { createRoot } from 'react-dom/client';
import { App } from '@/components/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LazyAbout } from '@/pages/about/About.lazy';
import { Shop } from '@/pages/shop';
import { Suspense } from 'react';

const root = document.getElementById('root');
if (!root) {
  throw new Error('root isnt found');
}
const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'...loading'}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={'...loading'}>
            <Shop />
          </Suspense>
        ),
      },
      { path: '/cart', element: <h1>cart</h1> },
      { path: '/account', element: <h1>account</h1> },
      { path: '/search', element: <h1>search</h1> },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
