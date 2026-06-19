import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { clearSelected } from '../../../store/selectedSlice';
import { handleDownload } from '../../../utils/handlerDownload';
import Button from '../../shared/button/Button';
import style from './SelectedItemsFlyout.module.scss';

export const SelectedItemsFlyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selected.items);

  const clearHandler = () => dispatch(clearSelected());

  if (selectedItems.length < 1) return;

  return (
    <div className={style.wrapper}>
      <div className={style.count}>
        <span>Selected items:</span> {selectedItems.length}
      </div>
      <div className={style.buttonsRow}>
        <Button
          text="Download"
          type="button"
          variant="blue"
          icon="download"
          iconPosition="left"
          callback={() => handleDownload(selectedItems)}
          disabled={false}
        />
        <Button
          text="Unselect all"
          type="button"
          variant="red"
          icon="close"
          iconPosition="left"
          callback={clearHandler}
          disabled={false}
        />
      </div>
    </div>
  );
};
