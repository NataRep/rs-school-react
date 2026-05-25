import { Suspense } from 'react';
import { Await, useLoaderData, useOutletContext } from 'react-router-dom';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import { formatKey } from '../../../utils/formatKey';
import { removeTechnicalFields } from '../../../utils/removeTechnicalField';
import Button from '../../shared/button/Button';
import SelectionCheckbox from '../selection-checkbox/SelectionСheckbox';
import style from './Detail.module.scss';

interface DetailContextType {
  item?: Person | Planet | Starship | undefined;
  isOpen: boolean;
  closeDetails: () => void;
}

function renderFields(obj: Record<string, unknown>) {
  const publicFieldsEntries = removeTechnicalFields(obj);
  return (
    <ul className={style.info}>
      {publicFieldsEntries.map(([key, value]) => (
        <li key={key}>
          <span>{formatKey(key)}:</span> {value}
        </li>
      ))}
    </ul>
  );
}

function DetailSkeleton(closeDetails: () => void) {
  return (
    <>
      <div className={style.card}>
        <div className={style.row}>
          <span className='skeleton'></span>
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
      </div >
      <div className={style.information}>
        <ul className={style.info}>
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index}>
              <span className="skeleton"></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function DetailView() {
  const data = useLoaderData() as { details: Promise<Person | Planet | Starship> };
  const { closeDetails } = useOutletContext<DetailContextType>();

  const wrapperClass = `${style.wrapper} ${style.open}`;

  return (
    <div className={wrapperClass}>
      <Suspense fallback={DetailSkeleton(closeDetails)}>
        <Await resolve={data.details}>
          {(resolvedItem: Person | Planet | Starship) => {
            if (!resolvedItem) return <div>No data available</div>;

            return (
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
                    <SelectionCheckbox data={resolvedItem} />
                  </div>
                  <h2 className={style.name}>
                    <span>Name:</span> {resolvedItem.name}
                  </h2>
                </div>
                {renderFields(resolvedItem)}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}