import React, {FC, MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useDispatch } from "react-redux";
import { createEntity, useSelector } from "./state";
import { typeToRender } from "./tools";

type LineState = null | {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export const Editor: FC = () => {
    const { entities, /*selectedEntity*/ } = useSelector(({ entities }) => ({ entities }));

    const body = useMemo(() => (
        entities.map((entity, index) => {
            const Component = typeToRender(entity.type);
            return <Component key={index} {...entity.fields} />;
        })
    ), [entities]);

    const [drawState, setDrawState] = useState<LineState>(null);

    const rectRef = useRef<DOMRect | null>(null);

    const handleDrawing = useCallback((e: MouseEvent) => {
        if (!rectRef.current || !drawState) {
            return;
        }
        const x = e.clientX - rectRef.current.left;
        const y = e.clientY - rectRef.current.top;
        setDrawState({
            ...drawState,
            x2: x, y2: y,
        });
    }, [drawState]);

    const dispatch = useDispatch();

    const handleEndDraw = useCallback((e: MouseEvent) => {
        if (!rectRef.current || !drawState) {
            return;
        }
        const x = e.clientX - rectRef.current.left;
        const y = e.clientY - rectRef.current.top;
        setDrawState(null);
        dispatch(createEntity({
            name: 'Name', // FIXME
            type: 'line',
            fields: {
                ...drawState,
                x2: x, y2: y,
            },
        }));
    }, [dispatch, drawState]);

    const svgRef = useRef<SVGSVGElement>(null);
    const handleStartDraw = useCallback<MouseEventHandler>((e)  => {
        const rect = e.currentTarget.getBoundingClientRect();
        rectRef.current = rect;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setDrawState({
            x1: x, y1: y,
            x2: x, y2: y,
        });
    }, []);

    useEffect(() => {
        if (!drawState || !svgRef.current) {
            return;
        }
        svgRef.current.addEventListener('mousemove', handleDrawing);
        svgRef.current.addEventListener('mouseup', handleEndDraw);
        return () => {
            if (!svgRef.current) {
                return;
            }
            svgRef.current.removeEventListener('mousemove', handleDrawing);
            svgRef.current.removeEventListener('mouseup', handleEndDraw);
        };
    }, [drawState, handleDrawing, handleEndDraw]);

    const drawing = drawState ? (
        <g>
            <line x1={drawState.x1} y1={drawState.y1} x2={drawState.x2} y2={drawState.y2} stroke="black" />
            <circle cx={drawState.x1} cy={drawState.y1} r={4} fill="black" />
            <circle cx={drawState.x2} cy={drawState.y2} r={4} fill="blue" />
        </g>
    ) : null;

    return (
        <svg ref={svgRef} width="1000" height="1000" onMouseDown={handleStartDraw}>
            {body}
            {drawing}
        </svg>
    );
};