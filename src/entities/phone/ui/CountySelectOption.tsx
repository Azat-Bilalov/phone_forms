import * as React from 'react';

import { Typo } from '@/shared/ui/basic/Typo';
import { Mask } from '../lib';

export type CountrySelectOptionProps = {
    mask: Mask;
};

const CountrySelectOptionUnwrapped: React.FC<CountrySelectOptionProps> = ({ mask }) => {
    return (
        <span>
            <Typo element="span" variant="body">
                {mask.emoji + ' ' + mask.prefix}
            </Typo>{' '}
            <Typo element="span" variant="body" color="secondary">
                {mask.name}
            </Typo>
        </span>
    );
};

export const CountrySelectOption = React.memo(CountrySelectOptionUnwrapped);
