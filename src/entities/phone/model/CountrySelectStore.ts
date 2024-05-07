import { computed, makeObservable } from 'mobx';
import React from 'react';

import { SelectFieldModel } from '@/shared/model/SelectFieldModel';
import { Mask } from '../lib';
import { CountrySelectOption } from '../ui/CountySelectOption';

type CountrySelectStoreOptions = {
    masks: Mask[];
};

export class CountrySelectStore extends SelectFieldModel {
    private readonly _masks: Mask[];

    constructor({ masks }: CountrySelectStoreOptions) {
        super({
            options: masks.map((mask) => ({
                key: mask.key,
                value: React.createElement(CountrySelectOption, { mask }),
            })),
        });

        this._masks = masks;

        makeObservable(this, {
            formatValue: computed,
        });
    }

    get formatValue(): string {
        const mask = this._masks.find((m) => m.key === this.firstValue?.key);

        if (!mask) {
            const firstMask = this._masks[0];
            return `${firstMask.emoji} ${firstMask.prefix}`;
        }

        return `${mask?.emoji} ${mask?.prefix}`;
    }
}
