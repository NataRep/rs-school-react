
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { toggleSelected } from '../../../store/selectedSlice';
import Icon from '../../shared/icon/Icon';
import type { SearchItem } from '../search-result-item/SearchResultItem';
import style from './SelectionСheckbox.module.scss';

interface SelectionCheckboxProps {
  data: SearchItem;
}

export default function SelectionCheckbox({ data }: SelectionCheckboxProps) {
  const reactId = useId();
  const dispatch = useDispatch();

  const isChecked = useSelector((state: RootState) =>
    state.selected.items.some(selectedItem => selectedItem.name === data.name)
  );

  const handleChange = () => {
    dispatch(toggleSelected(data));
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