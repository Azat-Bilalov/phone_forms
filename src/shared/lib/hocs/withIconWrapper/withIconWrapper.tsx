import clsx from 'clsx';
import * as React from 'react';

import colors from '@/app/styles/colors.module.scss';

import s from './IconWrapper.module.scss';

export type IconSizeProps =
    | {
          size?: string | number;
          width?: never;
          height?: never;
      }
    | {
          size?: never;
          width?: string | number;
          height?: string | number;
      };

export type IconBaseProps = Omit<React.ComponentProps<'svg'>, 'width' | 'height' | 'color'> & {
    className?: string;
    title?: string;
    color?: string;
};

export type IconProps = IconBaseProps & IconSizeProps & React.AriaAttributes;

export const withIconWrapper = (Component: React.FC<React.SVGProps<SVGSVGElement>>) =>
    React.memo(({ className, size, width, height, color, ...props }: IconProps) => {
        const iconWidth = width || size;
        const iconHeight = height || size;
        const iconColor = color && colors[color];

        return (
            <Component
                className={clsx(className, s.icon)}
                style={{ width: iconWidth, height: iconHeight }}
                role="img"
                color={iconColor}
                {...props}
            />
        );
    }) as React.FC<IconProps>;
