import { Status } from '@/shared/lib/types/Status';
import { InputField } from '@/shared/ui/InputField';
import { Typo } from '@/shared/ui/basic/Typo';
import React from 'react';

export type PhoneNumbersProps = {
    mask: string;
    numbers: string[];
    status?: Status;
    onChange: (numbers: string[]) => void;
};

const MOVE_LEFT_KEYS = new Set(['Backspace', 'ArrowLeft']);
const MOVE_RIGHT_KEYS = new Set(['ArrowRight']);

export const PhoneNumbers: React.FC<PhoneNumbersProps> = ({ mask, numbers, status, onChange }) => {
    const refs = React.useRef<(HTMLInputElement | null)[]>([]);

    console.log('refs', refs.current);

    const handleChange = React.useCallback(
        (index: number) => (value: string) => {
            if (isNaN(Number(value))) {
                return;
            }

            const newNumbers = [...numbers];
            newNumbers[index] = value;
            onChange(newNumbers);

            // @todo: исправить ошибку перехода, когда исходное значение было тем же самым
            if (value && index < numbers.length - 1) {
                const nextInput = refs.current[index + 1];
                if (nextInput) {
                    nextInput.focus();
                    const len = nextInput.value.length;
                    nextInput.setSelectionRange(0, len);
                }
            }
        },
        [numbers]
    );

    const handleKeyDown = React.useCallback(
        (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (
                index > 0 &&
                MOVE_LEFT_KEYS.has(event.key) &&
                event.currentTarget.selectionStart === 0
            ) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                }
                refs.current[index - 1]?.focus();
            }

            if (
                index < numbers.length - 1 &&
                MOVE_RIGHT_KEYS.has(event.key) &&
                (event.currentTarget.selectionStart === 1 || refs.current[index]?.value === '')
            ) {
                event.preventDefault();
                refs.current[index + 1]?.focus();
            }
        },
        [numbers]
    );

    let nextMaskIndex = 0;

    return mask.split('').map((char, index) => {
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
