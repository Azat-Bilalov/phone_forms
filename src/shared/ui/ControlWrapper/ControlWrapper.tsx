import clsx from 'clsx';
import * as React from 'react';

import { Typo } from '../basic/Typo';
import { Status } from '@/shared/lib/types/Status';

import s from './ControlWrapper.module.scss';
import { WarningIcon } from '@/assets/icons/WarningIcon';
import { CheckCircleIcon } from '@/assets/icons/CheckCircle';

export type ControlWrapperProps = {
    children: React.ReactNode;
    status?: Status;
    statusMessage?: React.ReactNode;
    label?: React.ReactNode;
    className?: string;
};

const ControlWrapper: React.FC<ControlWrapperProps> = ({
    children,
    className,
    label,
    status,
    statusMessage,
}) => {
    return (
        <div className={clsx(className, s.root)}>
            <div className={s.root__container}>
                {label && (
                    <Typo variant="caption" weight="heavy">
                        {label}
                    </Typo>
                )}
                {children}
                {statusMessage && (
                    <div className={s.root__status}>
                        {status === 'error' && <WarningIcon />}
                        {status === 'success' && <CheckCircleIcon />}
                        <Typo element="span" variant="body" color="secondary">
                            {statusMessage}
                        </Typo>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlWrapper;
