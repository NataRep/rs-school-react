import React from 'react';
import style from './Icon.module.scss';

import * as GeneratedIcons from '@/components/ui/icons';

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

const iconsMap: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined> = {
  search: GeneratedIcons.Search,
  close: GeneratedIcons.Close,
  people: GeneratedIcons.People,
  planets: GeneratedIcons.DeathStar,
  starships: GeneratedIcons.Starship,
  error: GeneratedIcons.Error,
  reload: GeneratedIcons.Reload,
  info: GeneratedIcons.Info,
  logo: GeneratedIcons.Logo,
  night: GeneratedIcons.Night,
  sun: GeneratedIcons.Sun,
  flag: GeneratedIcons.Flag,
  download: GeneratedIcons.Download,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className = '', ...props }: IconProps) {
  // Достаем нужный компонент из нашей мапы
  const SVGComponent = iconsMap[name];

  if (!SVGComponent) {
    console.warn(`Icon with name "${name}" not found in generated components.`);
    return null;
  }

  return (
    <SVGComponent
      className={`${style.svgIcon} ${className}`}
      {...props}
    />
  );
}