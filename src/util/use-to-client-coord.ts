import { RefObject, useCallback, useEffect, useRef } from "react";

export type GenericMouseEvent = {
    readonly clientX: number,
    readonly clientY: number,
};

export const useToClientCoord = <T extends {
    getBoundingClientRect: () => DOMRect
}>(elemRef: RefObject<T>) => {
    const rect = useRef<DOMRect | undefined>();
    // TODO: intersection observer
    useEffect(() => {
        if (elemRef.current) {
            rect.current = elemRef.current.getBoundingClientRect();
        }
    }, [elemRef]);
    const onCoord = useCallback(({clientX, clientY}: GenericMouseEvent) => {
        if (!rect.current) {
            throw new Error('Element must always be present');
        }
        const {left, top} = rect.current;
        return [clientX - left, clientY - top] as const;
    }, []);
    return onCoord;
};
