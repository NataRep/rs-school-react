import notFoundImg from '@/assets/images/not-found.png';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/search/people');
  };

  return (
    <main className={style.main}>
      <h1>404 - THIS IS NOT THE PAGE YOU ARE LOOKING FOR</h1>
      <div className={style.content}>
        <Image
          src={notFoundImg.src}
          alt="Not found"
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
          <Button
            type="button"
            text="Go to home"
            callback={handleGoHome}
            disabled={false}
            variant="blue"
            icon="starships"
            iconPosition="left"
          />
        </div>
      </div>
    </main>
  );
};
