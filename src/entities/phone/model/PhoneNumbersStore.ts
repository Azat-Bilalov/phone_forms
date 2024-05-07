import { FieldModel } from '@/shared/model/FieldModel';
import { action, computed, makeObservable, observable } from 'mobx';

export type PhoneNumbersStoreOptions = {
    currentMask: string;
};

export class PhoneNumbersStore extends FieldModel<string[]> {
    private _currentMask: string;

    private _validated: boolean = false;

    constructor({ currentMask }: PhoneNumbersStoreOptions) {
        super({
            defaultValue: currentMask.split('').reduce((acc: string[], char) => {
                if (char === '*') {
                    return [...acc, ''];
                }
                return acc;
            }, []),
        });

        this._currentMask = currentMask;

        type PrivateFields = '_currentMask' | '_validated';

        makeObservable<PhoneNumbersStore, PrivateFields>(this, {
            _currentMask: observable,
            _validated: observable,
            currentMask: computed,
            numbersCount: computed,
            validated: computed,
            setCurrentMask: action.bound,
            validate: action.bound,
            unValidate: action.bound,
        });
    }

    get currentMask(): string {
        return this._currentMask;
    }

    get numbersCount(): number {
        return this._currentMask.match(/\*/g)?.length || 0;
    }

    get validated() {
        return this._validated;
    }

    setCurrentMask(value: string) {
        this._currentMask = value;
        this.setDefaultValue(new Array(this.numbersCount).fill(''));
        this.setValue(new Array(this.numbersCount).fill('').map((_, i) => this.value[i] || ''));
    }

    validate() {
        this._validated = true;
    }

    unValidate() {
        this._validated = false;
    }
}
