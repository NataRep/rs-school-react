import GoHomeButton from '@/components/go-to-home-button/GoHomeButton';
import '@/globals.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import style from './not-found.module.scss';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <>
      <h1>{t('title')}</h1>
      <div className={style.content}>
        <Image
          src="/images/not-found.png"
          alt="Not found"
          width="240"
          height="240"
          className={style.image}
          priority
        />
        <div className={style.info}>
          <div className={style.text}>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
          <GoHomeButton />
        </div>
      </div>
    </>
  );
}
