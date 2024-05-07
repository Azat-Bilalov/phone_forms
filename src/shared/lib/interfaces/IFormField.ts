import { Status } from '../types/Status';
import { ILocalStore } from './ILocalStore';

export type StatusType = {
    value?: Status;
    message?: string;
};

export const getEmptyStatus = (): StatusType => ({ value: 'default' });

export type Validator<T> = (value: T) => StatusType;

export interface IFormField<T> extends ILocalStore {
    value: T;
    status: StatusType;
    hasSuccess: boolean;
    hasError: boolean;
    setValue(value: T): void;
    disabled: boolean;
    setDisabled(value: boolean): void;
    touched: boolean;
    reset(): void;
    touch(): void;
}

export interface IFormFieldOptions<T> {
    defaultValue: T;
    validator?: Validator<T>;
    disabled?: boolean;
    required?: boolean;
}
