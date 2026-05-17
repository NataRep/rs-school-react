import { Outlet } from 'react-router-dom';
import Tabs from '../shared/tab/Tabs';
import SearchForm from './search-form/SearchForm';
import style from './Search.module.scss';

export default function Search() {

  return <div className={style.container}>
    <h1>Star Wars Universe Search</h1>
    <SearchForm />
    <Tabs
      tabs={[
        { label: "People", value: "people" },
        { label: "Planets", value: "planets" },
        { label: "Starships", value: "starships" },
        { label: "Get 404", value: "error" }
      ] as const}
    />
    <div className={style.resultWrapper}>
      <Outlet />
    </div>
  </div>
}