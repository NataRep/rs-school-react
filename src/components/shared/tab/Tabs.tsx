import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { starWarsApi } from '../../../store/starWarsApi';
import Button from '../button/Button';
import Icon, { type IconName } from '../icon/Icon';
import style from './Tabs.module.scss';

type TabItem = {
  readonly label: string;
  readonly value: string;
};

type TabsProps = {
  readonly tabs: readonly TabItem[];
};

export default function Tabs({ tabs }: TabsProps) {
  const dispatch = useDispatch();
  const handleRefresh = () => {
    dispatch(starWarsApi.util.invalidateTags(['SwapiData']));
  };

  return (
    <div className={style.container}>
      <nav className={style.nav}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.value}
            to={`/search/${tab.value}`}
            className={({ isActive }) =>
              `${style.tab} ${isActive ? style.active : ''}`
            }
          >
            <Icon name={tab.value as IconName} className="center" />
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <Button
        type="button"
        text=""
        title="Refresh result"
        callback={() => handleRefresh()}
        variant="blue small"
        icon="reload"
      />
    </div>
  );
}
