import { RefObject, useCallback, useEffect, useState } from "react";
import { GenericMouseEvent, useToClientCoord } from "./use-to-client-coord";

export type Point = readonly [number, number]

export type Rect = {
    readonly x1: number,
    readonly y1: number,
    readonly x2: number,
    readonly y2: number,
};

export const useSelection = <T extends {}
    & {getBoundingClientRect: () => DOMRect}
    & Record<'addEventListener' | 'removeEventListener', (
        name: 'mousemove' | 'mousedown' | 'mouseup', 
        handler: (event: GenericMouseEvent) => void
    ) => void>
>(
    elemRef: RefObject<T>,
    onSelect: (rect: Rect) => void
) => {
    const [from, setFrom] = useState<Point | null>(null);
    const [to, setTo] = useState<Point | null>(null);

    const getCoord = useToClientCoord<T>(elemRef);

    const handleDrawing = useCallback((e: GenericMouseEvent) => {
        setTo(getCoord(e))
    }, [getCoord]);

    const handleEndDraw = useCallback((e: GenericMouseEvent) => {
        if (!from) return;
        const [x1, y1] = from;
        const [x2, y2] = getCoord(e);
        setFrom(null);
        onSelect({x1, y1, x2, y2});
    }, [from, getCoord, onSelect]);

    useEffect(() => {
        if (!from || !elemRef.current) {
            return;
        }
        const elem = elemRef.current;
        elem.addEventListener('mousemove', handleDrawing);
        elem.addEventListener('mouseup', handleEndDraw);
        return () => {
            elem.removeEventListener('mousemove', handleDrawing);
            elem.removeEventListener('mouseup', handleEndDraw);
        };
    }, [elemRef, from, handleDrawing, handleEndDraw]);

    const handleStartDraw = useCallback((e: GenericMouseEvent)  => {
        const point = getCoord(e);
        setFrom(point);
        setTo(point);
    }, [getCoord]);

    useEffect(() => {
        if (!elemRef.current) {
            return;
        }
        const elem = elemRef.current;
        elem.addEventListener('mousedown', handleStartDraw);
        return () => {
            elem.removeEventListener('mousedown', handleStartDraw);
        };
    }, [elemRef, handleStartDraw]);

    return from && to
        ? {x1: from[0], y1: from[1], x2: to[0], y2: to[1]} as const
        : null;
};