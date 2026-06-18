import type { ReactNode } from 'react';
import Icon from '../icon/Icon';
import style from './ErrorNotification.module.scss';

export default function ErrorNotification({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={style.errorNotification}>
      <div className={style.text}>
        <div className={style.icon}>
          <Icon name="error" />
        </div>
        <h2>{children}</h2>
      </div>
    </div>
  );
}
