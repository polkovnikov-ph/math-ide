import { FC, RefObject, useCallback, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { highlightEntity, selectEntity, State } from "./state";
import { AnyEntity, entityTypes } from "./tools";
import { useToClientCoord } from "./util/use-to-client-coord";

const threshold = 16;

const getClosestEntity = (entities: AnyEntity[], x: number, y: number): number | null => {
    const dists = entities
        .map(({type, fields}, index) => (
            [entityTypes[type].getDistance(x, y, fields), index] as const
        ))
        .filter(([dist]) => dist < threshold)
        .sort(([da, ia], [db, ib]) => {
            const d = Math.sign(da - db);
            if (d !== 0) {
                return d;
            }
            return ia - ib;
        });
    return dists.length > 0 ? dists[0][1] : null;
};

export const Selector: FC<{containerRef: RefObject<SVGSVGElement>}> = ({containerRef}) => {
    const store = useStore<State>();
    const dispatch = useDispatch();
    const getCoord = useToClientCoord(containerRef);

    const handleHover = useCallback((e: MouseEvent) => {
        const [x, y] = getCoord(e);
        const {entities} = store.getState();
        const newHighlightedEntity = getClosestEntity(entities, x, y);
        dispatch(highlightEntity(newHighlightedEntity));
    }, [dispatch, getCoord, store]);

    const handleClick = useCallback((e: MouseEvent) => {
        const [x, y] = getCoord(e);
        const {entities} = store.getState();
        const newSelectedEntity = getClosestEntity(entities, x, y);
        dispatch(selectEntity(newSelectedEntity));
    }, [dispatch, getCoord, store]);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const elem = containerRef.current;
        elem.addEventListener('mousemove', handleHover);
        elem.addEventListener('mousedown', handleClick);
        return () => {
            elem.removeEventListener('mousemove', handleHover);
            elem.removeEventListener('mousedown', handleClick);
        };
    }, [containerRef, handleHover, handleClick]);

    return null;
};