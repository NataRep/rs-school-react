import { useEffect, useState } from 'react';
import type { UserCardProps } from '../../../types/user';
import style from './UserCard.module.scss';

export default function UserCard({ user, onDelete }: UserCardProps) {
  const { id, name, age, email, gender, country, profileImage, submittedAt } = user;

  const [isNew, setIsNew] = useState(() => {
    const creationTime = new Date(submittedAt).getTime();
    const elapsedTime = Date.now() - creationTime;
    return elapsedTime < 4000;
  });

  useEffect(() => {
    if (!isNew) return;

    const creationTime = new Date(submittedAt).getTime();
    const elapsedTime = Date.now() - creationTime;
    const remainingTime = 4000 - elapsedTime;

    const timer = setTimeout(() => {
      setIsNew(false);
    }, remainingTime > 0 ? remainingTime : 0);

    return () => clearTimeout(timer);
  }, [isNew, submittedAt]);

  const formattedDate = new Date(submittedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const cardClassName = `${style.card} ${isNew ? style.newCardHighlight : ''}`;

  return (
    <div className={cardClassName}>
      <button
        type="button"
        className={style.deleteBtn}
        onClick={() => onDelete(id)}
        title="Delete user"
      >
        &times;
      </button>

      <div className={style.avatarWrapper}>
        {profileImage ? (
          <img src={profileImage} alt={`${name}'s avatar`} className={style.avatar} />
        ) : (
          <div className={`${style.avatarPlaceholder} ${style[gender || 'other']}`}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className={style.content}>
        <h3 className={style.name} title={name}>{name}</h3>
        <p className={style.email}>{email}</p>

        <div className={style.badges}>
          <span className={style.badge}>{country}</span>
          <span className={style.badge}>{age} years</span>
          <span className={`${style.badge} ${style[`gender-${gender}`]}`}>
            {gender}
          </span>
        </div>
      </div>

      <div className={style.footer}>
        <span className={style.dateLabel}>Created:</span>
        <time className={style.dateValue} dateTime={submittedAt}>{formattedDate}</time>
      </div>
    </div>
  );
}