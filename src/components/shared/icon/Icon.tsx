import style from './Icon.module.scss';

import CloseIcon from '@/assets/icons/close.svg';
import PlanetsIcon from '@/assets/icons/death-star.svg';
import DownloadIcon from '@/assets/icons/download.svg';
import ErrorIcon from '@/assets/icons/error.svg';
import FlagIcon from '@/assets/icons/flag.svg';
import InfoIcon from '@/assets/icons/info.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import NightIcon from '@/assets/icons/night.svg';
import PeopleIcon from '@/assets/icons/people.svg';
import ReloadIcon from '@/assets/icons/reload.svg';
import SearchIcon from '@/assets/icons/search.svg';
import StarshipsIcon from '@/assets/icons/starship.svg';
import SunIcon from '@/assets/icons/sun.svg';

export type IconName =
  | 'search'
  | 'close'
  | 'people'
  | 'planets'
  | 'starships'
  | 'error'
  | 'reload'
  | 'logo'
  | 'info'
  | 'night'
  | 'sun'
  | 'flag'
  | 'download';

const iconsMap: Record<IconName, { src: string }> = {
  search: SearchIcon,
  close: CloseIcon,
  people: PeopleIcon,
  planets: PlanetsIcon,
  starships: StarshipsIcon,
  error: ErrorIcon,
  reload: ReloadIcon,
  info: InfoIcon,
  logo: LogoIcon,
  night: NightIcon,
  sun: SunIcon,
  flag: FlagIcon,
  download: DownloadIcon,
};

interface IconProps {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className = '' }: IconProps) {
  const iconData = iconsMap[name];

  if (!iconData) return null;

  return (
    <span
      className={`${style.icon} ${className}`}
      style={{
        WebkitMaskImage: `url(${iconData.src})`,
        maskImage: `url(${iconData.src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        display: 'inline-block',
      }}
    />
  );
}