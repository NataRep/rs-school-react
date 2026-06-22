import ErrorNotification from '@/components/error-notification/ErrorNotification';
import { formatKey } from '@/utils/formatKey';
import { removeTechnicalFields } from '@/utils/removeTechnicalField';
import SelectionCheckbox from '../selection-checkbox/SelectionCheckbox';
import CloseDetailsButton from './CloseDetailsButton'; // 🌟 Наша кнопка
import style from './Detail.module.scss';

interface DetailViewProps {
  id: string;
  categoryName: string;
}

function renderFields(obj: Record<string, unknown>) {
  const publicFieldsEntries = removeTechnicalFields(obj);
  return (
    <ul className={style.info}>
      {publicFieldsEntries.map(([key, value]) => (
        <li key={key}>
          <span>{formatKey(key)}:</span> {String(value)}
        </li>
      ))}
    </ul>
  );
}

export default async function DetailView({
  id,
  categoryName,
}: DetailViewProps) {
  let data = null;
  let isError = false;

  try {
    const res = await fetch(`https://swapi.py4e.com/api/${categoryName}/${id}`);
    if (!res.ok) throw new Error();
    data = await res.json();
  } catch {
    isError = true;
  }

  const wrapperClass = `${style.wrapper} ${style.open}`;

  return (
    <div className={wrapperClass}>
      {isError && (
        <div className={style.errorBlock}>
          <div className={style.row}>
            <ErrorNotification>
              Failed to load details. Please try again.
            </ErrorNotification>
            <CloseDetailsButton />
          </div>
        </div>
      )}

      {!isError && data && (
        <div className={style.card}>
          <div
            className={style.closeWrapper}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <CloseDetailsButton />
          </div>

          <div className={style.row}>
            <div className={style.checkbox}>
              <SelectionCheckbox data={data} />
            </div>
            <h2 className={style.name}>
              <span>Name:</span> {(data as { name?: string }).name || 'Unknown'}
            </h2>
          </div>
          {renderFields(data as Record<string, unknown>)}
        </div>
      )}

      {!isError && !data && (
        <div className={style.row}>
          <div>No data available</div>
          <CloseDetailsButton />
        </div>
      )}
    </div>
  );
}
