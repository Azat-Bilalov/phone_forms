import { DEFAULT_VALIDATOR, Mask } from '../lib';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction } from 'mobx';
import { FieldModel } from '@/shared/model/FieldModel';
import { StatusType, getEmptyStatus } from '@/shared/lib/interfaces/IFormField';
import { CountrySelectStore } from './CountrySelectStore';
import { PhoneNumbersStore } from './PhoneNumbersStore';

export type Props = {
    masks: Mask[];
    /** Может иметь пробелы, скобки и проч. */
    defaultValue: string;
    onChange: (value: string) => void;
    onValidate?: (value: string) => StatusType;
    disabled?: boolean;
    required?: boolean;
};

export class PhoneInputStore extends FieldModel<string> {
    private _masks: Mask[];

    readonly countryStore: CountrySelectStore;
    readonly numbersStore: PhoneNumbersStore;

    private readonly _disposers: IReactionDisposer[];

    constructor({ masks, defaultValue, onChange, onValidate }: Props) {
        super({
            // Удаление всех символов, кроме цифр и плюса
            defaultValue: defaultValue.replace(/[^0-9+]/g, ''),
            validator: onValidate || DEFAULT_VALIDATOR(masks),
        });

        this.countryStore = new CountrySelectStore({ masks });
        this.numbersStore = new PhoneNumbersStore({ currentMask: masks[0].mask });

        this._masks = masks;

        this._disposers = [
            reaction(
                () => [this.countryStore.firstValue, this.numbersStore.value],
                () => {
                    const prefix = this.selectedMask.prefix;
                    const numbers = this.numbersStore.value.join('');

                    this._value = prefix + numbers;
                    onChange(this._value);
                }
            ),
            reaction(
                () => this.countryStore.firstValue,
                () => {
                    this.numbersStore.setCurrentMask(this.selectedMask.mask);
                }
            ),
        ];

        type PrivateFields = '_masks';

        makeObservable<PhoneInputStore, PrivateFields>(this, {
            _masks: observable.ref,
            masks: computed,
            selectedMask: computed,
            statusIfValidated: computed,
        });
    }

    get selectedMask(): Mask {
        return (
            this._masks.find((mask) => mask.key === this.countryStore.firstValue?.key) ||
            this._masks[0]
        );
    }

    get masks() {
        return this._masks;
    }

    get statusIfValidated(): StatusType {
        return this.numbersStore.validated ? this.status : getEmptyStatus();
    }

    destroy() {
        this._disposers.map((d) => d());
    }
}
