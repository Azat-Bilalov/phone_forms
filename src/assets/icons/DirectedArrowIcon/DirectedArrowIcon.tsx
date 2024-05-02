import clsx from 'clsx';
import * as React from 'react';

import { IconBaseProps, IconSizeProps } from '@/shared/lib/hocs/withIconWrapper';

import { ArrowType, Direction, ARROW_ICON_MAP } from './config';

import s from './DirectedArrowIcon.module.scss';

export type DirectedArrowIconProps = Omit<IconBaseProps, 'type'> & {
    type?: ArrowType;
    direction?: Direction;
} & IconSizeProps &
    React.AriaAttributes;

const DirectedArrowIcon: React.FC<DirectedArrowIconProps> = ({
    className,
    type = 'common',
    direction = 'right',
    ...props
}) => {
    const Icon = ARROW_ICON_MAP[type];

    return <Icon {...props} className={clsx(className, s.arrow, s[`arrow_${direction}`])} />;
};

export default React.memo(DirectedArrowIcon);
