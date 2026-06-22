'use client';

import Button from '@/components/button/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CloseDetailsButton() {
  const router = useRouter();
  const rawPathname = usePathname();
  const searchParams = useSearchParams();

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');

    const cleanPathname = rawPathname.replace(/^\/(ru|en)(\/|$)/, '/') || '/';
    router.push(`${cleanPathname}?${newParams.toString()}`);
  };

  return (
    <Button
      text=""
      type="button"
      callback={handleClose}
      variant="base"
      icon="close"
    />
  );
}
