import type { CategoryMap } from "../../../services/api-service/api-service";
import Icon, { type IconName } from "../icon/Icon";
import style from './Tabs.module.scss';

export type TabsProps = {
  tabs: TabItem[];
  activeTab: keyof CategoryMap | string;
  onSelect?: (value: keyof CategoryMap | string) => void;
};

export type TabItem = {
  label: string;
  value: keyof CategoryMap | string;
};

export default function Tabs({
  tabs,
  activeTab,
  onSelect,
}: TabsProps) {
  return (
    <div className={style.container}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`${style.tab} ${activeTab === tab.value ? style.active : ''
            }`}
          onClick={() => onSelect?.(tab.value)}
        >
          <Icon
            name={tab.value as IconName}
            className="center"
          />
          {tab.label}
        </button>
      ))}
    </div>
  );
}