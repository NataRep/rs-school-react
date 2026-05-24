
import { useId, useState } from 'react';
import Icon from '../../shared/icon/Icon';
import type { SearchItem } from '../search-result-item/SearchResultItem';
import style from './SelectionСheckbox.module.scss';

interface SelectionCheckboxProps {
  data: SearchItem;
}

export default function SelectionCheckbox({ data }: SelectionCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const reactId = useId();

  const handleChange = () => {
    const nextChecked = !isChecked;
    setIsChecked(nextChecked);

    console.log(nextChecked, data);
  };

  return <div className={style.wrapper}>
    <input type='checkbox'
      id={`${reactId}-checkbox`}
      className={style.checkbox}
      checked={isChecked}
      onChange={handleChange}
    ></input>
    <label
      htmlFor={`${reactId}-checkbox`}
      className={style.label}
      title="Save">
      <Icon name="flag"></Icon>
    </label>
  </div>
}