import Button from '../../../../UI/Button/Button';
import style from './ToolsBar.module.scss';

export default function ToolsBar() {
  const callback = () => console.log('Click!');

  return (<>
    <div className={style.tools}>
      <Button
        text='Open uncontrolled Form'
        type='button'
        callback={callback}
        disabled={false}
        classNames={['']}
        title="Open modal with uncontrolled Form"
      />
      <Button
        text='Open React Hook Form'
        type='button'
        callback={callback}
        disabled={false}
        classNames={['']}
        title="Open modal with React Hook Form"
      />
    </div>
  </>);

}