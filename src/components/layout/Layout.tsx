'use client';

import Button from '@/components/button/Button';
import { ThemeButton } from '@/components/theme-button/ThemeButton';
import TopNav from '@/components/top-nav/TopNav';
import { useState } from 'react';
import style from './Layout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [error] = useState<Error | null>(null);

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
          <TopNav />
          <ThemeButton />
        </div>
      </div>

      <main className={style.main}>{children}</main>
    </div>
  );
}
