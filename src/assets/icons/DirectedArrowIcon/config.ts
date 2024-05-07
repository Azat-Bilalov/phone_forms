import { FC } from 'react';

import { withIconWrapper, IconProps } from '@/shared/lib/hocs/withIconWrapper';

// import { ReactComponent as ArrowCircleIcon } from './ArrowCircleIcon.c.svg';
// import { ReactComponent as ArrowIcon } from './ArrowIcon.c.svg';

import ArrowCircleIcon from './ArrowCircleIcon';
import ArrowIcon from './ArrowIcon';

export type Direction = 'up' | 'down' | 'left' | 'right';

export type ArrowType = 'common' | 'circle';

export const ARROW_ICON_MAP: Record<ArrowType, FC<IconProps>> = {
    common: withIconWrapper(ArrowIcon),
    circle: withIconWrapper(ArrowCircleIcon),
};
