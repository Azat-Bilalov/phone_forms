import { action, computed, makeObservable, observable } from 'mobx';
import {
    StatusType,
    IFormField,
    IFormFieldOptions,
    Validator,
    getEmptyStatus,
} from '../lib/interfaces/IFormField';

export class FieldModel<T> implements IFormField<T> {
    protected readonly _validator: Validator<T>;
    protected _defaultValue: T;
    protected readonly _defaultDisable: boolean;
    protected readonly _defaultRequired: boolean;

    protected _value: T;
    protected _touched: boolean = false;
    protected _disabled: boolean = false;
    protected _required: boolean = false;
    protected _focused: boolean = false;

    constructor({ defaultValue, validator, disabled, required }: IFormFieldOptions<T>) {
        this._validator = validator || getEmptyStatus;
        this._defaultValue = defaultValue;
        this._defaultDisable = disabled || false;
        this._defaultRequired = required || false;

        this._value = this._defaultValue;
        this._disabled = this._defaultDisable;
        this._required = this._defaultRequired;

        type PrivateFields = '_value' | '_touched' | '_disabled' | '_required' | '_focused';

        makeObservable<FieldModel<T>, PrivateFields>(this, {
            _value: observable,
            _touched: observable,
            _disabled: observable,
            _required: observable,
            _focused: observable,

            value: computed,
            touched: computed,
            disabled: computed,
            required: computed,
            focused: computed,
            status: computed,
            statusMessage: computed,
            hasSuccess: computed,
            hasError: computed,
            formFieldView: computed,

            setValue: action.bound,
            touch: action.bound,
            unTouch: action.bound,
            setDisabled: action.bound,
            setRequired: action.bound,
            focus: action.bound,
            blur: action.bound,
            reset: action.bound,
            setDefaultValue: action.bound,
        });
    }

    get value(): T {
        return this._value;
    }

    get touched(): boolean {
        return this._touched;
    }

    get disabled(): boolean {
        return this._disabled;
    }

    get required(): boolean {
        return this._required;
    }

    get focused(): boolean {
        return this._focused;
    }

    get status(): StatusType {
        return this._validator(this._value);
    }

    get hasError(): boolean {
        return this.status.value === 'error';
    }

    get hasSuccess(): boolean {
        return this.status.value === 'success';
    }

    get statusMessage(): string | null {
        return this.status?.message || null;
    }

    touch(): void {
        this._touched = true;
    }

    unTouch(): void {
        this._touched = false;
    }

    setValue(value: T): void {
        this.touch();
        this._value = value;
    }

    setDisabled(value: boolean): void {
        this._disabled = value;
    }

    setRequired(value: boolean): void {
        this._required = value;
    }

    focus(): void {
        this._focused = true;
    }

    blur(): void {
        this._focused = false;
    }

    reset(): void {
        this._value = this._defaultValue;
        this._touched = false;
        this._disabled = this._defaultDisable;
        this._required = this._defaultRequired;
    }

    setDefaultValue(value: T): void {
        this._defaultValue = value;
    }

    get formFieldView(): {
        value: FieldModel<T>['value'];
        onChange: FieldModel<T>['setValue'];
        status: FieldModel<T>['status'];
        onBlur: FieldModel<T>['touch'];
        important: FieldModel<T>['required'];
    } {
        return {
            value: this.value,
            onChange: this.setValue,
            status: this.touched ? this.status : getEmptyStatus(),
            onBlur: this.touch,
            important: this.required,
        };
    }

    destroy() {
        this.reset();
    }
}
