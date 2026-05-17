import { NavLink } from 'react-router-dom';
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
  return (
    <div className={style.container}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.value}
          to={`/search/${tab.value}`}
          className={({ isActive }) =>
            `${style.tab} ${isActive ? style.active : ''}`
          }
        >
          <Icon
            name={tab.value as IconName}
            className="center"
          />
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}