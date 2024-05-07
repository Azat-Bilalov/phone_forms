import { useLocalStore } from '@/shared/lib/hooks/useLocalStore';
import { Mask } from '../../lib';
import { PhoneInputStore } from '../../model';
import { CountrySelect } from '../CountrySelect';
import { PhoneNumbers } from '../PhoneNumbers';
import { observer } from 'mobx-react-lite';
import { StatusType } from '@/shared/lib/interfaces/IFormField';
import ControlWrapper from '@/shared/ui/ControlWrapper';

import s from './PhoneInput.module.scss';

export type PhoneInputProps = {
    masks: Mask[];
    value: string;
    onChange: (value: string) => void;
    onValidate?: (value: string) => StatusType;
    onSubmit?: () => void;
};

const PhoneInputUnwrapped: React.FC<PhoneInputProps> = ({ masks, value, onChange, onValidate }) => {
    const store = useLocalStore(
        () =>
            new PhoneInputStore({
                masks,
                defaultValue: value,
                onChange,
                onValidate,
            })
    );

    return (
        <ControlWrapper
            label="Введите номер телефона"
            status={store.status.value}
            statusMessage={store.numbersStore.validated && store.statusMessage}
        >
            <div className={s['phone-input']}>
                <CountrySelect model={store.countryStore} status={store.statusIfValidated.value} />
                <PhoneNumbers model={store.numbersStore} status={store.statusIfValidated.value} />
            </div>
        </ControlWrapper>
    );
};

export const PhoneInput = observer(PhoneInputUnwrapped);
