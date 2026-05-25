import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../shared/loader/Loader';
import Tabs from '../shared/tab/Tabs';
import SearchForm from './search-form/SearchForm';
import style from './Search.module.scss';
import { SelectedItemsFlyout } from './selected-items-flyout/SelectedItemsFlyout';

export default function Search() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

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
      {isLoading ? <Loader /> : <Outlet />}
    </div>
    <SelectedItemsFlyout />
  </div>
}