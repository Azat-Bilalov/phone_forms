import React from 'react';
import clsx from 'clsx';
import { OptionEntity } from '@/shared/lib/types/OptionEntity';

import s from './OptionsList.module.scss';

export type OptionsListProps<V extends OptionEntity<string | number>> = {
    options: V[];
    selected: Set<string | number>;
    type?: 'checkbox' | 'radio';
    onChange?: (key: string | number, checked: boolean) => void;
};

const OptionsListUnwrapped = <V extends OptionEntity>({
    options,
    selected,
    type = 'radio',
    onChange,
}: OptionsListProps<V>) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { checked, value } }) => {
            onChange?.(value, checked);
        },
        [onChange]
    );

    return (
        <div className={s['list']}>
            {options.map((option) => (
                <label
                    key={option.key}
                    className={clsx(
                        s['list__item'],
                        selected.has(option.key) && s['list__item_selected']
                    )}
                >
                    <input
                        type={type}
                        className={s['list__input']}
                        value={option.key}
                        onChange={handleChange}
                    />
                    {option.value}
                </label>
            ))}
        </div>
    );
};

export const OptionList = React.memo(OptionsListUnwrapped);
