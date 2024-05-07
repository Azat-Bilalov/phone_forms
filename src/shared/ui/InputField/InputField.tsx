import React from 'react';
import clsx from 'clsx';
import { BaseField, BaseFieldProps } from '../basic/BaseField';
import { useFieldFocus } from '@/shared/lib/hooks/useFieldFocus';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>;

export type InputFieldProps = BaseFieldProps &
    InputProps & {
        ref?: React.ForwardedRef<HTMLInputElement>;
        onChange?: (value: string) => void;
        inputClassName?: string;
    };

const InputFieldUnwrapped = (
    {
        className,
        before,
        after,
        onFocus,
        onBlur,
        onChange,
        disabled,
        status,
        size,
        inputClassName,
        ...props
    }: InputFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
) => {
    const { handleBlur, handleFocus, isActive } = useFieldFocus();

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event.target.value);
        },
        [onChange]
    );

    return (
        <BaseField
            className={className}
            before={before}
            after={after}
            active={isActive}
            status={status}
            disabled={disabled}
        >
            <input
                ref={ref}
                className={clsx('clean-input', inputClassName)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={disabled}
                {...props}
            />
        </BaseField>
    );
};

export const InputField = React.forwardRef(InputFieldUnwrapped);
