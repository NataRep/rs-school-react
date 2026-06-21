import { useTheme } from '../../hooks/useTheme';
import Icon from '../shared/icon/Icon';
import style from './ThemeButton.module.scss';

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <label className={style.toggle} title="Toggle theme">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className={style.input}
      />
      <div className={style.slider}>
        <span className={`${style.icon} ${style.sun}`}>
          <Icon name="sun" />
        </span>

        <span className={`${style.icon} ${style.night}`}>
          <Icon name="night" />
        </span>
      </div>
    </label>
  );
};
