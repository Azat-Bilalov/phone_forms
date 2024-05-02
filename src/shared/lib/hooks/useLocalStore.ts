import * as React from 'react';

import { ILocalStore } from '../interfaces/ILocalStore';

export const useLocalStore = <S extends ILocalStore>(creator: () => S): S => {
    const [store] = React.useState(creator);

    React.useEffect(
        () => () => {
            store.destroy();
        },
        [store]
    );

    return store;
};
