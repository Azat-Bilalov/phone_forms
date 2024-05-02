import React from 'react';
import { Popper } from '@/shared/ui/basic/Popper';
import { OptionEntity } from '../../lib/types/OptionEntity';
import { BaseField, BaseFieldProps } from '../basic/BaseField';
import { OptionList } from '../basic/OptionsList';
import clsx from 'clsx';
import { CloseIcon } from '@/assets/icons/CloseIcon';
import DirectedArrowIcon from '@/assets/icons/DirectedArrowIcon';
import { useFieldFocus } from '@/shared/lib/hooks/useFieldFocus';

import s from './Select.module.scss';
import { Typo } from '../basic/Typo';

export type SelectProps<V extends OptionEntity> = {
    popperClassName?: string;
    children?: React.ReactNode;
    options: V[];
    selected: V[];
    onReset?: VoidFunction;
    onChange: (option: V[]) => void;
    placeholder?: string;
    multi?: boolean;
    closeOnSelect?: boolean;
    formatValue?: (selected: V[]) => string;
    element?: 'div' | 'input';
} & BaseFieldProps;

const FORMAT_DEFAULT = <V extends OptionEntity>(selected: V[]) =>
    selected.map(({ value }) => value).join(', ');

const SelectUnwrapped = <V extends OptionEntity>({
    className,
    before,
    popperClassName,
    children,
    options,
    selected,
    onReset,
    onChange,
    placeholder,
    disabled = false,
    multi = false,
    status,
    onClick,
    closeOnSelect = !multi,
    formatValue = FORMAT_DEFAULT,
    element = 'input',
}: SelectProps<V>) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const selectedIds = React.useMemo(() => new Set(selected.map(({ key }) => key)), [selected]);

    const handleChange = React.useCallback(
        (optionKey: V['key']) => {
            if (multi) {
                selectedIds.has(optionKey)
                    ? selectedIds.delete(optionKey)
                    : selectedIds.add(optionKey);
            }

            onChange(
                options.filter(({ key }) => (multi ? selectedIds.has(key) : key === optionKey))
            );

            if (closeOnSelect) {
                setIsOpen(false);
            }
        },
        [multi, onChange, options, closeOnSelect, selectedIds, setIsOpen]
    );

    const { isActive, handleBlur, handleFocus } = useFieldFocus();

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const containerId = React.useId();

    const value = React.useMemo<string>(() => formatValue(selected), [formatValue, selected]);

    const handleInputClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
        (event) => {
            event.stopPropagation();
            onClick?.(event);
            setIsOpen((prev) => !prev);
        },
        [onClick]
    );

    return (
        <>
            <BaseField
                id={containerId}
                onClick={handleInputClick}
                className={clsx(s['select'], className)}
                active={isActive}
                before={before}
                // after={
                //     onReset && !disabled && Boolean(selected.length) ? (
                //         // <BaseClickable onClick={onReset} withHover>
                //         <CloseIcon />
                //     ) : (
                //         // </BaseClickable>
                //         <DirectedArrowIcon color="blue-main-75" direction="down" size={20} />
                //     )
                // }
                status={status}
                ref={containerRef}
                disabled={disabled}
            >
                {element === 'div' ? (
                    <div onFocus={handleFocus} onBlur={handleBlur} tabIndex={0}>
                        <Typo variant="body">{value}</Typo>
                    </div>
                ) : (
                    <input
                        className="clean-input"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                    />
                )}
            </BaseField>
            <Popper
                popperClassName={clsx(s['select__options-wrapper'], popperClassName)}
                ignoreId={containerId}
                referenceElement={containerRef.current}
                onClose={() => setIsOpen(false)}
                open={isOpen}
            >
                {children || (
                    <OptionList options={options} selected={selectedIds} onChange={handleChange} />
                )}
            </Popper>
        </>
    );
};

export const Select = React.memo(SelectUnwrapped);
