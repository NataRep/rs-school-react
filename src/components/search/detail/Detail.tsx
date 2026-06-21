import { useLoaderData, useOutletContext } from 'react-router-dom';
import { useGetEntityDetailsQuery } from '../../../store/starWarsApi';
import { formatKey } from '../../../utils/formatKey';
import { removeTechnicalFields } from '../../../utils/removeTechnicalField';
import Button from '../../button/Button';
import ErrorNotification from '../../shared/error-notification/ErrorNotification';
import SelectionCheckbox from '../selection-checkbox/SelectionCheckbox';
import style from './Detail.module.scss';

interface DetailContextType {
  closeDetails: () => void;
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

function DetailSkeleton({ closeDetails }: { closeDetails: () => void }) {
  return (
    <>
      <div className={style.card}>
        <div className={style.row}>
          <span
            className="skeleton"
            style={{ width: '50%', height: '20px' }}
          ></span>
          <Button
            text=""
            type="button"
            callback={closeDetails}
            disabled={false}
            variant="base"
            icon="close"
            iconPosition="left"
          />
        </div>
      </div>
      <div className={style.information}>
        <ul className={style.info}>
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index}>
              <span
                className="skeleton"
                style={{ width: '100%', height: '15px' }}
              ></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function DetailView() {
  const { closeDetails } = useOutletContext<DetailContextType>();
  const { categoryName, id } = useLoaderData() as {
    categoryName: string;
    id: string;
  };
  const { data, isLoading, isError, error } = useGetEntityDetailsQuery({
    category: categoryName,
    id,
  });

  const getErrorContent = () => {
    if (!error) return null;
    return 'Failed to load details. Please try again.';
  };

  const wrapperClass = `${style.wrapper} ${style.open}`;

  return (
    <div className={wrapperClass}>
      {isLoading && <DetailSkeleton closeDetails={closeDetails} />}

      {!isLoading && isError && (
        <div className={style.errorBlock}>
          <div className={style.row}>
            <ErrorNotification>{getErrorContent()}</ErrorNotification>
            <Button
              text=""
              type="button"
              callback={closeDetails}
              variant="base"
              icon="close"
            />
          </div>
        </div>
      )}

      {!isLoading && !isError && data && (
        <div className={style.card}>
          <Button
            text=""
            type="button"
            callback={closeDetails}
            disabled={false}
            variant="base"
            icon="close"
            iconPosition="left"
          />
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

      {!isLoading && !isError && !data && (
        <div className={style.row}>
          <div>No data available</div>
          <Button
            text=""
            type="button"
            callback={closeDetails}
            variant="base"
            icon="close"
          />
        </div>
      )}
    </div>
  );
}
