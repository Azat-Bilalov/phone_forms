import * as React from 'react';

export type OptionEntity<K = string | number, V = string | React.ReactNode> = {
    key: K;
    value: V;
};
