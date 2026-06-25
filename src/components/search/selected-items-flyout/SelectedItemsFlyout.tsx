'use client';

import Button from '@/components/button/Button';
import type { RootState } from '@/store';
import { clearSelected } from '@/store/selectedSlice';
import { handleDownload } from '@/utils/handlerDownload';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import style from './SelectedItemsFlyout.module.scss';

export const SelectedItemsFlyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selected.items);
  const t = useTranslations('Search.flyout');

  const clearHandler = () => dispatch(clearSelected());

  if (selectedItems.length < 1) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.count}>
        <span>{t('selectedCount')}</span> {selectedItems.length}
      </div>
      <div className={style.buttonsRow}>
        <Button
          text={t('downloadBtn')}
          type="button"
          variant="blue"
          icon="download"
          iconPosition="left"
          callback={() => handleDownload(selectedItems)}
          disabled={false}
        />
        <Button
          text={t('unselectAllBtn')}
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
