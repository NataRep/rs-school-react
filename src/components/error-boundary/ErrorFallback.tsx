'use client';

import Button from '@/components/button/Button';
import { useTranslations } from 'next-intl';
import style from './ErrorBoundary.module.scss';

export default function ErrorFallback() {
  const t = useTranslations('Errors');

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className={style.wrapper}>
      <h2>{t('boundaryMessage')}</h2>
      <Button
        type="button"
        text={t('reloadBtn')}
        callback={handleReload}
        disabled={false}
        variant="blue"
        icon="reload"
        iconPosition="right"
      />
    </div>
  );
}
