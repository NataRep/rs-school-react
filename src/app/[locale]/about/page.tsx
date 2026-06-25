import Icon from '@/components/icon/Icon';
import { useTranslations } from 'next-intl';
import style from './About.module.scss';

export default function About() {
  const t = useTranslations('About');

  return (
    <div className={style.wrapper}>
      <h1>{t('title')}</h1>

      <p>
        {t.rich('p1', {
          github: (chunks) => (
            <a
              href="https://github.com/NataRep"
              rel="noopener noreferrer"
              title="GitHub"
              target="_blank"
              className={style.link}
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      <p>
        {t.rich('p2', {
          swapi: (chunks) => (
            <a
              href="https://swapi.py4e.com/"
              rel="noopener noreferrer"
              title="SWAPI API"
              target="_blank"
              className={style.link}
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      <h2>{t('subtitleMe')}</h2>
      <p>{t('pMe1')}</p>
      <p>{t('pMe2')}</p>

      <h2>{t('subtitleCourse')}</h2>
      <p>{t('pCourse')}</p>

      <div className={style.logo}>
        <Icon name="logo" className={style.logo} />
      </div>

      <p>
        {t.rich('mentor', {
          mentorLink: (chunks) => (
            <a
              href="https://github.com/max0n4ik"
              title="GitHub"
              target="_blank"
              className={style.link}
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      <p>
        {t.rich('courseLink', {
          courseLink: (chunks) => (
            <a
              href="https://rs.school/courses/reactjs"
              title="RS School react course"
              target="_blank"
              className={style.link}
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
}
