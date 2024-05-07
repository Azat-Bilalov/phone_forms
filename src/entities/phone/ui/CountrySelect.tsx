import React from 'react';
import { Select } from '@/shared/ui/Select';
import { Status } from '@/shared/lib/types/Status';
import { CountrySelectStore } from '../model/CountrySelectStore';
import { observer } from 'mobx-react-lite';

export type CountrySelectProps = {
    model: CountrySelectStore;
    status?: Status;
};

const CountrySelectUnwrapped: React.FC<CountrySelectProps> = ({ model, status }) => {
    const { options, value, setValue, formatValue } = model;

    const handleFormatValue = React.useCallback(() => formatValue, [formatValue]);

    return (
        <Select
            selected={value}
            onChange={setValue}
            options={options}
            element="div"
            status={status}
            formatValue={handleFormatValue}
        />
    );
};

export const CountrySelect = observer(CountrySelectUnwrapped);
