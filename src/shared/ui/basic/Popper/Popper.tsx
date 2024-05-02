import { useClickOutside } from '@/shared/lib/hooks/useClickOutside';
import React from 'react';
import { usePopper } from 'react-popper';

export type PopperProps = {
    popperClassName?: string;
    referenceElement: HTMLElement | null;
    children: React.ReactNode;
    open: boolean;
    ignoreId?: string;
    onClose: () => void;
};

export const Popper: React.FC<PopperProps> = ({
    popperClassName,
    referenceElement,
    children,
    open,
    ignoreId,
    onClose,
}) => {
    const [popper, setPopper] = React.useState<HTMLDivElement | null>(null);
    const [arrow, setArrow] = React.useState<HTMLDivElement | null>(null);

    const popperRef = React.useRef<HTMLDivElement>();

    const { styles, attributes } = usePopper(referenceElement, popper, {
        placement: 'bottom-start',
        strategy: 'fixed',
    });

    React.useEffect(() => {
        if (!popper) {
            return;
        }

        popperRef.current = popper;
    }, [open]);

    useClickOutside({
        ref: popperRef,
        handler: onClose,
        events: ['click'],
        ignoreId,
    });

    return (
        <div ref={setPopper} style={styles.popper} {...attributes.popper}>
            <div ref={setArrow} style={styles.arrow} />
            <div className={popperClassName}>{open && children}</div>
        </div>
    );
};
