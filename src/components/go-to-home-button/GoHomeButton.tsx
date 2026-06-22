'use client';

import Button from '@/components/button/Button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function GoHomeButton() {
  const router = useRouter();
  const t = useTranslations('NotFound');

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Button
      type="button"
      text={t('goHome')}
      callback={handleGoHome}
      disabled={false}
      variant="blue"
      icon="starships"
      iconPosition="left"
    />
  );
}
