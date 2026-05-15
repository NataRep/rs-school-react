import { Outlet } from 'react-router-dom';
import style from './Main.module.scss';


export default function Main() {

  return (
    <main className={style.mainContainer}>
      <Outlet></Outlet>
    </main>
  );
}
