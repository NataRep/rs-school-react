import style from './Icon.module.scss';

import CloseIcon from '@/assets/icons/close.svg?react';
import PlanetsIcon from '@/assets/icons/death-star.svg?react';
import DownloadIcon from '@/assets/icons/download.svg?react';
import ErrorIcon from '@/assets/icons/error.svg?react';
import FlagIcon from '@/assets/icons/flag.svg?react';
import InfoIcon from '@/assets/icons/info.svg?react';
import LogoIcon from '@/assets/icons/logo.svg?react';
import NightIcon from '@/assets/icons/night.svg?react';
import PeopleIcon from '@/assets/icons/people.svg?react';
import ReloadIcon from '@/assets/icons/reload.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import StarshipsIcon from '@/assets/icons/starship.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';

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

const iconsMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
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

export default function Icon({ name }: IconProps) {
  const SelectedIcon = iconsMap[name];

  return <SelectedIcon className={`${style.icon}`} />;
}
