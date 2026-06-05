import { useState } from 'react';
import Button from '../../../../UI/Button/Button';
import Modal from '../../../../UI/Modal/Modal';
import style from './ToolsBar.module.scss';

export default function ToolsBar() {
  const [activeForm, setActiveForm] = useState<'uncontrolled' | 'hook-form' | null>(null);

  const handleOpenModal = (type: 'uncontrolled' | 'hook-form') => {
    setActiveForm(type);
  };

  const handleCloseModal = () => {
    setActiveForm(null);
  };

  return (<>
    <div className={style.tools}>
      <Button
        text='Open uncontrolled Form'
        type='button'
        callback={() => handleOpenModal('uncontrolled')}
        disabled={false}
        classNames={['']}
        title="Open modal with uncontrolled Form"
      />
      <Button
        text='Open React Hook Form'
        type='button'
        callback={() => handleOpenModal('hook-form')}
        disabled={false}
        classNames={['']}
        title="Open modal with React Hook Form"
      />
    </div>

    <Modal
      isOpen={activeForm !== null}
      onClose={handleCloseModal}
      title={activeForm === 'uncontrolled' ? 'Uncontrolled Form' : 'React Hook Form'}
    >
      {activeForm === 'uncontrolled' && (
        '<UncontrolledForm onSuccess={handleCloseModal} />'
      )}

      {activeForm === 'hook-form' && (
        '<HookForm onSuccess={handleCloseModal} />'
      )}
    </Modal>
  </>);

}