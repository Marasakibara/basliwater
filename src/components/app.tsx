import { Outlet } from 'react-router-dom';
import Header from './header/header'
import AuthProvider from '@/auth/AuthProvier';

export const App = () => {

  return (
    <>
      <AuthProvider>
        <>
          <Header />
          <Outlet />
        </>
      </AuthProvider>
      <></>
    </>
  );
};
