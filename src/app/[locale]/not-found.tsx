import GoHomeButton from '@/components/go-to-home-button/GoHomeButton';
import '@/globals.scss';
import Image from 'next/image';
import style from './not-found.module.scss';

export default function NotFound() {
  return (
    <>
      <h1>404 - THIS IS NOT THE PAGE YOU ARE LOOKING FOR</h1>
      <div className={style.content}>
        <Image
          src="/images/not-found.png"
          alt="Not found"
          width='240'
          height='240'
          className={style.image}
          priority
        />
        <div className={style.info}>
          <div className={style.text}>
            <p>THE PATHWAY LOST. THIS SECTOR CONTAINS NO DATA.</p>
            <p>
              Return to the beginning of your journey, traveller. The galaxy is
              vast, but not every path leads to the destination.
            </p>
          </div>
          <GoHomeButton />
        </div>
      </div>
    </>
  );
}