import style from './Button.module.scss';

interface ButtonProps {
  text: string;
  type: 'submit' | 'reset' | 'button';
  callback?: () => void;
  disabled?: boolean;
  classNames?: string[];
  title?: string;
}

export default function Button({
  text,
  type,
  callback,
  disabled = false,
  classNames = [''],
  title = ""
}: ButtonProps) {

  const propClasses = classNames.map((name) => style[name]);

  const classes = [
    style.button,
    ...propClasses,
  ].join(' ');

  return (
    <button
      type={type}
      onClick={callback}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      title={title}
    >
      {text}
    </button>
  );
}