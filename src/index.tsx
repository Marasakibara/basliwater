import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LazyAbout } from '@/pages/about/About.lazy';
import { LazyMain } from '@/pages/main/Main.lazy';
import { LazyInfo } from '@/pages/info/Info.lazy';
import { LazyAdmin } from '@/pages/admin/Admin.lazy';
import React, { Suspense, createElement } from 'react';
import './index.module.scss'
import { LazyReg } from './pages/reg/reg.lazy';
import { LazyAuth } from './pages/auth/auth.lazy';

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
        path: '/Main',
        element: (
          <Suspense fallback={'...loading'}>
            <LazyMain />
          </Suspense>
        ),
      },
      {
        path: '/info',
        element: (
          <Suspense fallback={'...loading'}>
            <LazyInfo />
          </Suspense>
        ),
      },
      {
        path: '/admin',
        element: (
          <Suspense fallback={'...loading'}>
            <LazyAdmin />
          </Suspense>
        ),
      },
      {
        path: '/auth',
        element: (
          <Suspense fallback={'...loading'}>
            <LazyAuth />
          </Suspense>
        ),
      },
      {
        path: '/reg',
        element: (
          <Suspense fallback={'...loading'}>
            <LazyReg />
          </Suspense>
        ),
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
