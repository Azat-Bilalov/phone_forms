import { useLocalStore } from '@/shared/lib/hooks/useLocalStore';
import { Mask } from '../../lib';
import { PhoneStore } from '../../model';
import { CountrySelect } from '../CountrySelect';
import { PhoneNumbers } from '../PhoneNumbers';
import { observer } from 'mobx-react-lite';

import s from './PhoneInput.module.scss';

export type PhoneInputProps = {
    masks: Mask[];
    value: string;
    onChange: (value: string) => void;
};

const PhoneInputUnwrapped: React.FC<PhoneInputProps> = ({ masks, value, onChange }) => {
    const store = useLocalStore(
        () =>
            new PhoneStore({
                masks,
                defaultValue: value,
                onChange,
            })
    );

    return (
        <div className={s.root}>
            <CountrySelect
                masks={store.masks}
                selectedMask={store.selectedMask}
                onChange={store.setMask}
            />
            <PhoneNumbers
                mask={store.selectedMask.mask}
                numbers={store.numbers}
                onChange={store.setNumbers}
            />
        </div>
    );
};

export const PhoneInput = observer(PhoneInputUnwrapped);
