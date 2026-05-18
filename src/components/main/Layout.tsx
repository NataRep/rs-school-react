import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../shared/button/Button';
import TopNav from '../top-nav/TopNav';
import style from './Layout.module.scss';


export default function Layout() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [error] = useState<Error | null>(null);

  if (shouldCrash) {
    throw new Error('Critical rendering error');
  }

  if (error) {
    return <div className={style.error}>{error.message}. Try another category.</div>;
  }

  return <div className={style.container}>
    <div className={style.row}>
      <Button
        text="Show Error Boundary"
        callback={() => setShouldCrash(true)}
        type="button"
        disabled={false}
        variant="red"
        icon="error"
        iconPosition="left"
      />
      <TopNav></TopNav>
    </div>

    <main className={style.main}>
      <Outlet></Outlet>
    </main>


  </div>;
}
