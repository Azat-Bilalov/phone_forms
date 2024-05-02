import React from 'react';
import clsx from 'clsx';

import s from './Typo.module.scss';

export type TypoProps = {
    children: React.ReactNode;
    element?: 'p' | 'span';
    variant?: 'caption' | 'body';
    weight?: 'light' | 'heavy';
    color?: 'default' | 'primary' | 'secondary';
    align?: 'left' | 'center' | 'right';
    className?: string;
};

export const Typo: React.FC<TypoProps> = ({ children, element, variant, weight, color, align }) => {
    const Tag = element || 'p';

    return (
        <Tag
            className={clsx(s['typo'], {
                [s[`typo_variant_${variant}`]]: variant,
                [s[`typo_weight_${weight}`]]: weight,
                [s[`typo_color_${color}`]]: color,
                [s[`typo_align_${align}`]]: align,
            })}
        >
            {children}
        </Tag>
    );
};
