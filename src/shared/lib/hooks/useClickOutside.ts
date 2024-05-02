import * as React from 'react';

type HandlerType = (...args: any[]) => void;

type UseClickOutsideParams<H extends HandlerType = HandlerType> = {
    ref: React.RefObject<any>;
    handler: H | undefined;
    ignoreClass?: string;
    ignoreId?: string;
    events?: string[];
};

export const useClickOutside = <H extends HandlerType = HandlerType>({
    ref,
    handler,
    ignoreClass,
    ignoreId,
    events = ['mousedown', 'touchstart'],
}: UseClickOutsideParams<H>) => {
    React.useEffect(() => {
        if (!handler) {
            return;
        }

        const listener = (event: any) => {
            if (!ref.current) {
                return;
            }

            if (
                ignoreClass &&
                [...document.querySelectorAll(`.${ignoreClass}`)].some((element) =>
                    element.contains(event.target)
                )
            ) {
                return;
            }

            if (ignoreId && document.getElementById(ignoreId)?.contains(event.target)) {
                return;
            }

            if (!ref.current?.contains(event.target)) {
                handler();
            }
        };

        events.forEach((type) => document.addEventListener(type, listener));

        return () => events.forEach((type) => document.removeEventListener(type, listener));
    }, [ref, handler, ignoreClass, ignoreId, events]);
};
