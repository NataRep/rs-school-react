import Icon from '@/components/icon/Icon';
import type { RootState } from '@/store';
import { toggleSelected } from '@/store/selectedSlice';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { SearchItem } from '../search-result-item/SearchResultItem';
import style from './SelectionCheckbox.module.scss';

interface SelectionCheckboxProps {
  data: SearchItem;
}

export default function SelectionCheckbox({ data }: SelectionCheckboxProps) {
  const reactId = useId();
  const dispatch = useDispatch();

  const isChecked = useSelector((state: RootState) =>
    state.selected.items.some(
      (selectedItem) => selectedItem.name === data.name,
    ),
  );

  const handleChange = () => {
    dispatch(toggleSelected(data));
  };

  return (
    <div className={style.wrapper}>
      <input
        type="checkbox"
        id={`${reactId}-checkbox`}
        className={style.checkbox}
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        htmlFor={`${reactId}-checkbox`}
        className={style.label}
        title="Save"
      >
        <Icon name="flag" />
      </label>
    </div>
  );
}
