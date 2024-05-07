import { StatusType } from '@/shared/lib/interfaces/IFormField';
import { Mask } from './phoneMasks';

const NOT_FOUND_PREFIX_STATUS: StatusType = {
    value: 'error',
    message: 'Некорректный префикс номера телефона',
};

const NOT_COMPLETED_STATUS: StatusType = {
    value: 'error',
    message: 'Неправильный номер телефона',
};

const CORRECT_STATUS: StatusType = {
    value: 'success',
    message: 'Номер телефона введён верно',
};

export const DEFAULT_VALIDATOR = (masks: Mask[]) => (value: string) => {
    const currentMask = masks.find((mask) => value.startsWith(mask.prefix));

    if (!currentMask) {
        return NOT_FOUND_PREFIX_STATUS;
    }

    const numbersCountRequired = currentMask.mask.match(/\*/g)?.length || 0;
    const valueNumbersCount = value.replace(currentMask.prefix, '').length;

    return numbersCountRequired === valueNumbersCount ? CORRECT_STATUS : NOT_COMPLETED_STATUS;
};
