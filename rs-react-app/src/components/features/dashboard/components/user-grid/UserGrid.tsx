import { useDispatch, useSelector } from 'react-redux';
import { removeSubmission, selectSubmissions } from '../../../../../store/userSlice';
import UserCard from '../../../../UI/UserCard/UserCard';
import style from './UserGrid.module.scss';

export default function UserGrid() {
  const users = useSelector(selectSubmissions);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(removeSubmission(id));
  };

  if (users.length === 0) {
    return <div className={style.empty}>Список пользователей пуст</div>;
  }

  return (
    <div className={style.grid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}