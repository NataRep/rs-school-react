'use client';

import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';

export default function GoHomeButton() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Button
      type="button"
      text="Go to home"
      callback={handleGoHome}
      disabled={false}
      variant="blue"
      icon="starships"
      iconPosition="left"
    />
  );
}
