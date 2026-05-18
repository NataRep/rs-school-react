import { Outlet } from 'react-router-dom';
import TopNav from '../top-nav/TopNav';
import style from './Layout.module.scss';


export default function Layout() {
  return <div className={style.container}>
    <TopNav></TopNav>
    <main className={style.main}>
      <Outlet></Outlet>
    </main>
  </div>;
}
