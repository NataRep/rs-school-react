import { Component } from "react";
import Icon, { type IconName } from "../icon/Icon";
import style from './Button.module.scss';

interface ButtonProps {
  text: string;
  callback: () => void;
  disabled: boolean;
  className?: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}

export default class Button extends Component<ButtonProps> {
  static defaultProps = {
    iconPosition: 'left',
  };

  renderIcon(position: 'left' | 'right') {
    const { icon, iconPosition } = this.props;

    if (!icon || iconPosition !== position) return null;

    return (
      <Icon
        name={icon}
        className="center"
      />
    );
  }

  render() {
    const { text, callback, disabled, className } = this.props;
    const btnClass = [style.btn, className].filter(Boolean).join(' ');

    return (
      <button
        type="button"
        onClick={callback}
        className={`${style.button} ${style[btnClass]}`}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {this.renderIcon('left')}
        {text}
        {this.renderIcon('right')}
      </button>
    );
  }
}