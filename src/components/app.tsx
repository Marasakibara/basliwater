import { useState } from 'react';
import classes from './app.module.scss';
import { Link, Outlet } from 'react-router-dom';
import AvatarPng from '@/assets/image.png';
import EqupPng from '@/assets/XDBkiS-wwtM.jpg';
import InvenotoryPng from '@/assets/qyoXAvB2znI.jpg';
import MousePng from '@/assets/necolendar.svg';

function TODO() {
  TODO2();
}
function TODO2() {
  throw new Error();
}
function TODO3() {
  console.log('TODO3');
}

export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    TODO();
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div data-testid={'App'}>
        <h1 data-testid={'Platform'}>PLATFORM={__PLATFORM__}</h1>
        <div>
          <img width={100} height={100} src={AvatarPng} />
          <img width={100} height={100} src={EqupPng} />
          <img width={100} height={100} src={InvenotoryPng} />
          <div>
            <MousePng width={50} height={50} fill={'green'}></MousePng>
          </div>
        </div>
        <Link to={'/about'}>about </Link>
        <Link to={'/shop'}>shop </Link>
        <Link to={'/cart'}>cart </Link>
        <Link to={'/account'}>account </Link>
        <Link to={'/search'}>search </Link>
      </div>
      <h1 className={classes.value}>Hello world, {count}</h1>
      <button className={classes.button} onClick={increment}>
        click
      </button>
      <Outlet></Outlet>
    </>
  );
};
