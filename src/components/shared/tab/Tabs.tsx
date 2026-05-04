import { Component } from "react";
import type { CategoryMap } from "../../../services/api-service";
import Icon from "../icon/Icon";
import style from './Tabs.module.scss';

export type TabsProps = {
  tabs: TabItem[];
  activeTab: keyof CategoryMap;
  onSelect?: (value: keyof CategoryMap) => void;
};

export type TabItem = {
  label: string;
  value: keyof CategoryMap;
};


export default class Tabs extends Component<TabsProps> {

  render() {
    const { tabs, activeTab, onSelect } = this.props;

    return (
      <div className={style.container}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`${style.tab} ${activeTab === tab.value ? style.active : ""
              }`}
            onClick={() => onSelect?.(tab.value)}
          >
            <Icon
              name={tab.value}
              className="center"
            />
            {tab.label}
          </button>
        ))}
      </div>
    );
  }
}