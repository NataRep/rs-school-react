import Icon, { type IconName } from "../icon/Icon";
import style from './Button.module.scss';

interface ButtonProps {
  text: string;
  type: 'submit' | 'reset' | 'button';
  callback?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  variant?: 'blue' | 'red' | 'base';
}

function renderIcon(
  icon: IconName | undefined,
  iconPosition: 'left' | 'right' | undefined,
  current: 'left' | 'right'
) {
  if (!icon || iconPosition !== current) return null;

  return <Icon name={icon} className={style.icon} />;
}

export default function Button({
  text,
  type,
  callback,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
  variant = 'blue',
}: ButtonProps) {

  const classes = [
    style.button,
    style[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={callback}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {renderIcon(icon, iconPosition, 'left')}
      {text}
      {renderIcon(icon, iconPosition, 'right')}
    </button>
  );
}