import { Status } from '@/shared/lib/types/Status';
import { InputField } from '@/shared/ui/InputField';
import { Typo } from '@/shared/ui/basic/Typo';
import React from 'react';
import { PhoneNumbersStore } from '../model/PhoneNumbersStore';
import { observer } from 'mobx-react-lite';

export type PhoneNumbersProps = {
    model: PhoneNumbersStore;
    status?: Status;
};

const MOVE_LEFT_KEYS = new Set(['Backspace', 'ArrowLeft']);
const MOVE_RIGHT_KEYS = new Set(['ArrowRight']);

const PhoneNumbersUnwrapped: React.FC<PhoneNumbersProps> = ({ model, status }) => {
    const {
        currentMask,
        numbersCount,
        value: numbers,
        setValue: setNumbers,
        validate,
        unValidate,
    } = model;

    const refs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = React.useCallback(
        (index: number) => (value: string) => {
            if (isNaN(Number(value))) {
                return;
            }

            unValidate();

            const newNumbers = [...numbers];
            newNumbers[index] = value;
            setNumbers(newNumbers);

            // @todo: исправить ошибку перехода, когда исходное значение было тем же самым
            if (value && index < numbersCount - 1) {
                const nextInput = refs.current[index + 1];
                if (nextInput) {
                    nextInput.focus();
                    const len = nextInput.value.length;
                    nextInput.setSelectionRange(0, len);
                }
            }
        },
        [numbersCount, numbers, setNumbers]
    );

    const handleKeyDown = React.useCallback(
        (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                validate();
            }

            if (
                MOVE_LEFT_KEYS.has(event.key) &&
                index > 0 &&
                event.currentTarget.selectionStart === 0
            ) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                }
                refs.current[index - 1]?.focus();
            }

            if (
                MOVE_RIGHT_KEYS.has(event.key) &&
                index < numbersCount - 1 &&
                (event.currentTarget.selectionStart === 1 || refs.current[index]?.value === '')
            ) {
                event.preventDefault();
                refs.current[index + 1]?.focus();
            }
        },
        [numbersCount]
    );

    let nextMaskIndex = 0;

    return currentMask.split('').map((char, index) => {
        if (char === '*') {
            const number = numbers[nextMaskIndex];
            const currentMaskIndex = nextMaskIndex;

            nextMaskIndex += 1;

            return (
                <InputField
                    ref={(ref) => {
                        refs.current[currentMaskIndex] = ref;
                    }}
                    key={index}
                    value={number}
                    status={status}
                    placeholder={String(nextMaskIndex % 10)}
                    onChange={handleChange(currentMaskIndex)}
                    onKeyDown={handleKeyDown(currentMaskIndex)}
                    maxLength={1}
                    style={{ width: '32px', paddingLeft: '12px', paddingRight: '12px' }}
                />
            );
        }

        return (
            <Typo key={index} variant="body" color="secondary">
                {char}
            </Typo>
        );
    });
};

export const PhoneNumbers = observer(PhoneNumbersUnwrapped);
