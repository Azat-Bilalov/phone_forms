import React from 'react';
import { Select } from '@/shared/ui/Select';
import { Mask, PHONE_MASK_LIST } from '../lib';
import { OptionEntity } from '@/shared/lib/types/OptionEntity';
import { Typo } from '@/shared/ui/basic/Typo';
import { Status } from '@/shared/lib/types/Status';

export type CountrySelectProps = {
    masks: Mask[];
    selectedMask: Mask;
    status?: Status;
    onChange: (value: Mask) => void;
};

export const CountrySelect: React.FC<CountrySelectProps> = ({
    masks,
    selectedMask,
    status,
    onChange,
}) => {
    const options = React.useMemo(
        () =>
            masks.map((mask) => ({
                key: mask.key,
                value: (
                    <span>
                        <Typo element="span" variant="body">
                            {mask.emoji + ' ' + mask.prefix}
                        </Typo>{' '}
                        <Typo element="span" variant="body" color="secondary">
                            {mask.name}
                        </Typo>
                    </span>
                ),
            })),
        [masks]
    );

    const selectedOption = React.useMemo(() => {
        return options.find(({ key }) => key === selectedMask.key) || options[0];
    }, [selectedMask]);

    const handleChange = React.useCallback(
        (options: OptionEntity[]) => {
            const mask = masks.find(({ key }) => key === options[0].key);
            onChange(mask || masks[0]);
        },
        [masks, onChange]
    );

    const handleFormatValue = React.useCallback((selected: OptionEntity[]) => {
        const mask = PHONE_MASK_LIST.find((m) => m.key === selected[0].key);
        return `${mask?.emoji} ${mask?.prefix}`;
    }, []);

    return (
        <Select
            selected={[selectedOption]}
            onChange={handleChange}
            options={options}
            element="div"
            status={status}
            formatValue={handleFormatValue}
        />
    );
};
