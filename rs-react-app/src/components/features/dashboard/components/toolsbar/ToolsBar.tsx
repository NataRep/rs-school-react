import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubmission } from '../../../../../store/userSlice';
import type { UserFormData } from '../../../../../types/user';
import Button from '../../../../UI/Button/Button';
import Modal from '../../../../UI/Modal/Modal';
import ControlledForm from '../../../forms/components/hook-form/ControlledForm';
import UncontrolledForm from '../../../forms/components/uncontrolled-form/UncontrolledForm';
import style from './ToolsBar.module.scss';

export default function ToolsBar() {
  const [activeForm, setActiveForm] = useState<'uncontrolled' | 'hook-form' | null>(null);
  const dispatch = useDispatch();

  const handleOpenModal = (type: 'uncontrolled' | 'hook-form') => {
    setActiveForm(type);
  };

  const handleCloseModal = () => {
    setActiveForm(null);
  };

  const handleFormSubmit = (data: UserFormData<string>) => {
    dispatch(addSubmission(data));
    handleCloseModal();
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
        <UncontrolledForm onSubmitSuccess={handleFormSubmit} onCloseModal={handleCloseModal} />
      )}

      {activeForm === 'hook-form' && (
        <ControlledForm onSubmitSuccess={handleFormSubmit} onCloseModal={handleCloseModal} />
      )}
    </Modal>
  </>);
}