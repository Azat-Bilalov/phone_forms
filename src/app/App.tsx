import { PhoneInput } from '@/entities/phone/ui/PhoneInput';
import { PHONE_MASK_LIST } from '@/entities/phone/lib/phoneMasks';

import './styles/index.scss';
import s from './App.module.scss';

export const App = () => {
    const phone = '';

    return (
        <div className={s.root}>
            <PhoneInput
                value={phone}
                onChange={(value) => console.log(value)}
                masks={PHONE_MASK_LIST}
            />
        </div>
    );
};
