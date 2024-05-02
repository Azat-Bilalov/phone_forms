export type Mask = {
    key: string;
    name: string;
    emoji: string;
    prefix: string;
    mask: string;
};

export const PHONE_MASK_LIST = [
    {
        key: 'ru',
        name: 'Россия',
        emoji: '🇷🇺',
        prefix: '+7',
        mask: '(***) - *** - ** - **',
    },
    {
        key: 'us',
        name: 'США',
        emoji: '🇺🇸',
        prefix: '+1',
        mask: '(***) - *** - ****',
    },
    {
        key: 'cn',
        name: 'Китай',
        emoji: '🇨🇳',
        prefix: '+86',
        mask: '**** - *** - ****',
    },
    {
        key: 'de',
        name: 'Германия',
        emoji: '🇩🇪',
        prefix: '+49',
        mask: '(***) - *** - ****',
    },
    {
        key: 'jp',
        name: 'Япония',
        emoji: '🇯🇵',
        prefix: '+81',
        mask: '*** - ** - ****',
    },
    {
        key: 'fr',
        name: 'Франция',
        emoji: '🇫🇷',
        prefix: '+33',
        mask: '(**) ** ** ** **',
    },
    {
        key: 'gb',
        name: 'Великобритания',
        emoji: '🇬🇧',
        prefix: '+44',
        mask: '**** *** ***',
    },
];
