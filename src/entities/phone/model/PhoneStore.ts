import { ILocalStore } from '@/shared/lib/interfaces/ILocalStore';
import { Mask } from '../lib';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction } from 'mobx';

export type Props = {
    masks: Mask[];
    defaultValue: string;
    onChange: (value: string) => void;
};

type PrivateFields = '_masks' | '_numbers' | '_selectedMask';

export class PhoneStore implements ILocalStore {
    private _masks: Mask[];
    private _numbers: string[];
    private _selectedMask: Mask;

    private readonly _disposers: IReactionDisposer[];

    constructor({ masks, defaultValue, onChange }: Props) {
        this._masks = masks;

        const [selectedMask, numbers] = this._parseValue(defaultValue);

        this._selectedMask = selectedMask;

        const numberCount = selectedMask.mask.match(/\*/g)?.length || 0;
        this._numbers = new Array(numberCount).fill('').map((_, i) => numbers[i] || '');

        this._disposers = [
            reaction(
                () => this.value,
                (value: string) => onChange(value)
            ),
        ];

        makeObservable<PhoneStore, PrivateFields>(this, {
            _masks: observable.ref,
            _numbers: observable.ref,
            _selectedMask: observable,

            value: computed,
            masks: computed,
            numbers: computed,
            selectedMask: computed,

            setMask: action.bound,
            setNumbers: action.bound,
        });
    }

    get value() {
        const prefix = this.selectedMask.prefix;
        return `${prefix}${this._numbers.join('')}`;
    }

    get masks() {
        return this._masks;
    }

    get numbers() {
        return this._numbers;
    }

    get selectedMask() {
        return this._selectedMask;
    }

    private _parseValue(value: string): [Mask, string[]] {
        const mask = this._masks.find((mask) => value.startsWith(mask.prefix));
        if (!mask) {
            return [this._masks[0], []];
        }

        const numbers = value
            .replace(mask.prefix, '')
            .replace(/[^0-9]/g, '')
            .split('');

        return [mask, numbers];
    }

    setNumbers(numbers: string[]) {
        this._numbers = numbers;
    }

    setMask(mask: Mask) {
        this._selectedMask = mask;

        const numberCount = mask.mask.match(/\*/g)?.length || 0;

        if (this._numbers.length !== numberCount) {
            this._numbers = new Array(numberCount).fill('').map((_, i) => this._numbers[i] || '');
        }
    }

    destroy() {
        this._disposers.map((d) => d());
    }
}
