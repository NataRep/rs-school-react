import { useCallback, useState } from 'react';
import { ColumnModal } from '../column-modal/column-modal';
import styles from './column-selection-manager.module.css';

type ManagerProps = {
  availableColumns: string[];
  selectedColumns: string[];
  onToggle: (column: string) => void;
};

export const ColumnSelectionManager = ({ availableColumns, selectedColumns, onToggle }: ManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className={styles.columnButtonContainer}>
        <button onClick={handleToggle} className={styles.columnButton}>
          Select columns ({selectedColumns.length} selected)
        </button>
      </div>

      <ColumnModal
        isOpen={isOpen}
        availableColumns={availableColumns}
        selectedColumns={selectedColumns}
        onToggle={onToggle}
        onClose={handleToggle}
      />
    </>
  );
};