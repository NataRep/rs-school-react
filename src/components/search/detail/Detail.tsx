import { useLoaderData, useOutletContext } from 'react-router-dom';
import type { Person, Planet, Starship } from '../../../services/api-service/api-models';
import Button from '../../shared/button/Button';
import style from './Detail.module.scss';

interface DetailContextType {
  item?: Person | Planet | Starship | undefined;
  isOpen: boolean;
  closeDetails: () => void;
}

const excludedFields = new Set(["url", "created", "edited", "homeworld"]);

function renderFields(obj: Record<string, unknown>) {
  return (
    <ul className={style.info}>
      {Object.entries(obj)
        .filter(([key, value]) => {
          if (excludedFields.has(key)) return false;
          if (Array.isArray(value)) return false;
          return true;
        })
        .map(([key, value]) => (
          <li key={key}>
            <span>{key}:</span> {String(value)}
          </li>
        ))}
    </ul>
  );
}

export default function DetailView() {
  const item = useLoaderData() as Person | Planet | Starship;
  const { closeDetails } = useOutletContext<DetailContextType>();

  if (!item) {
    return <div className={style.wrapper}>No data available</div>;
  }

  const wrapperClass = `${style.wrapper} ${style.open}`;

  return (
    <div className={style.overview} >
      <div className={wrapperClass}>
        <div className={style.row}>
          <h2 className={style.name}>
            <span>Name:</span> {item.name}
          </h2>
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

        <div className={style.information}>
          <div className={style.subtitle}>Information:</div>
          {renderFields(item as unknown as Record<string, unknown>)}
        </div>
      </div>
    </div>
  );
}