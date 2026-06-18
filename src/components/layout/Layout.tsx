import { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Button from '../shared/button/Button';
import Loader from '../shared/loader/Loader';
import style from './Layout.module.scss';
import { ThemeButton } from './theme-button/ThemeButton';
import TopNav from './top-nav/TopNav';

export default function Layout() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [error] = useState<Error | null>(null);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (shouldCrash) {
    throw new Error('Critical rendering error');
  }

  if (error) {
    return (
      <div className={style.error}>{error.message}. Try another category.</div>
    );
  }

  return (
    <div className={style.container}>
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
        <div className={style.tools}>
          <TopNav></TopNav>
          <ThemeButton></ThemeButton>
        </div>
      </div>

      <main className={style.main}>{isLoading ? <Loader /> : <Outlet />}</main>
    </div>
  );
}
