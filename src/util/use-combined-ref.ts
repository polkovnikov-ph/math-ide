import { MutableRefObject, RefCallback, useCallback } from "react";

export const useCombinedRef = <T,>(...refs: (RefCallback<T> | MutableRefObject<T | null>)[]) => {
    return useCallback<RefCallback<T>>((value) => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(value);
            } else {
                ref.current = value;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
};

