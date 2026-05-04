
import { Component, lazy, Suspense } from 'react';

const iconsMap = {
  search: lazy(() => import('@/assets/icons/search.svg?react')),
  close: lazy(() => import('@/assets/icons/close.svg?react')),
  people: lazy(() => import('@/assets/icons/people.svg?react')),
  planets: lazy(() => import('@/assets/icons/death-star.svg?react')),
  spaceships: lazy(() => import('@/assets/icons/spaceship.svg?react')),
};

export type IconName = keyof typeof iconsMap;

interface IconProps {
  name: IconName;
  className?: string;
}

export default class Icon extends Component<IconProps> {
  render() {
    const { name, className } = this.props;
    const SelectedIcon = iconsMap[name];

    return <Suspense fallback={<span className={className} />}>
      <SelectedIcon className={className} />
    </Suspense>
  }
}