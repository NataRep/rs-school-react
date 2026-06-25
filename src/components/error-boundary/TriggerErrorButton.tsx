'use client';

import Button from '@/components/button/Button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function TriggerErrorButton() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const t = useTranslations('Errors');

  if (shouldCrash) {
    throw new Error('Critical rendering error triggered by user');
  }

  return (
    <Button
      text={t('triggerBtn')}
      callback={() => setShouldCrash(true)}
      type="button"
      disabled={false}
      variant="red"
      icon="error"
      iconPosition="left"
    />
  );
}
