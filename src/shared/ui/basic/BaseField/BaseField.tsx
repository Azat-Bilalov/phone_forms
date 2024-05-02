import clsx from 'clsx';
import React from 'react';

import s from './BaseField.module.scss';
import { Status } from '@/shared/lib/types/Status';

export type BaseFieldProps = {
    id?: string;
    className?: string;
    after?: React.ReactNode;
    before?: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    status?: Status;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

type Props = BaseFieldProps & {
    children: React.ReactElement;
};

const BaseFieldUnwrapped = (
    { id, className, children, after, before, active, disabled, status, onClick }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const component = React.cloneElement(children, {
        className: clsx(children.props.className, s['base-field__inner']),
    });

    return (
        <div
            id={id}
            className={clsx(
                s['base-field'],
                className,
                active && s['base-field_active'],
                status === 'error' && s['base-field_error'],
                status === 'success' && s['base-field_success'],
                disabled && s['base-field_disabled']
            )}
            onClick={onClick}
            ref={ref}
        >
            {before && <div className={s['base-field__before']}>{before}</div>}
            {component}
            {after && <div className={s['base-field__after']}>{after}</div>}
        </div>
    );
};

export const BaseField = React.forwardRef(BaseFieldUnwrapped);
