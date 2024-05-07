import { action, computed, makeObservable, observable } from 'mobx';

import { FieldModel } from './FieldModel';
import { OptionEntity } from '../lib/types/OptionEntity';
import { IFormFieldOptions } from '../lib/interfaces/IFormField';

type PrivateFields = '_options';

export type SelectFieldModelOptions<V> = {
    options?: V[];
} & Partial<IFormFieldOptions<V[]>>;

export class SelectFieldModel<V extends OptionEntity = OptionEntity> extends FieldModel<V[]> {
    protected _options: V[];

    constructor(options: SelectFieldModelOptions<V> = {}) {
        super({ ...options, defaultValue: options.defaultValue || [] });

        this._options = options.options || [];

        makeObservable<SelectFieldModel<V>, PrivateFields>(this, {
            _options: observable.ref,
            firstValue: computed,
            options: computed,
            setOptions: action.bound,
            resetOptions: action.bound,
            isSelectedAll: computed,
        });
    }

    /**
     * Первый элемент в массиве `value`. Для обычного селекта
     * (не мультиселекта) это будет являться выбранным значением
     */
    get firstValue(): V | null {
        return this._value[0] || null;
    }

    get options(): V[] {
        return this._options;
    }

    setOptions(value: V[]): void {
        this._options = value;
    }

    resetOptions(): void {
        this._options = [];
    }

    get isSelectedAll(): boolean {
        return this.value.length === this.options.length;
    }
}
