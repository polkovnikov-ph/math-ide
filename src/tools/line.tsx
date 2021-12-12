import { FC, useCallback } from "react";
import { Knob } from "../pure/knob";
import { GetType, Schema } from "../util/types";
import { Rect, useSelection } from "../util/use-selection";
import { CreatorFC, descriptor, RenderState } from "./common";

const schema = (s: Schema) => (
    s.object({
        x1: s.number,
        y1: s.number,
        x2: s.number,
        y2: s.number,
    })
);

type Fields = GetType<typeof schema>

const Line: FC<{
    fields: Fields, state: RenderState
}> = ({
    fields: {x1, y1, x2, y2}, 
    state = 'normal',
}) => {
    const stroke = state === 'highlighted' ? 'blue' : 'black';
    const knobs = state === 'selected' ? (
        <>
            <Knob x={x1} y={y1} />
            <Knob x={x2} y={y2} />
        </>
    ) : null;
    return (
        <>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} />
            {knobs}
        </>
    );
};

const LineCreator: CreatorFC<Fields> = ({containerRef, onCreateEntity}) => {
    const handleSelect = useCallback((rect: Rect) => {
        if (rect.x1 === rect.x2 && rect.y1 === rect.y2) {
            return;
        }
        onCreateEntity(rect);
    }, [onCreateEntity]);

    const rect = useSelection(containerRef, handleSelect);

    return rect ? (
        <g>
            <Line fields={rect} state="normal" />
            <Knob x={rect.x1} y={rect.y1} />
            <Knob x={rect.x2} y={rect.y2} />
        </g>
    ) : null;
};

const sqr = (x: number) => x * x;
const dist2 = (vx: number, vy: number, wx: number, wy: number) => {
    return sqr(vx - wx) + sqr(vy - wy);
};

const getDistance = (px: number, py: number, {x1, y1, x2, y2}: Fields) => {
    const l2 = dist2(x1, y1, x2, y2);
    if (l2 === 0) {
        return dist2(px, py, x1, y1);
    }
    const t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    const t2 = Math.max(0, Math.min(1, t));
    return dist2(px, py, x1 + t2 * (x2 - x1), y1 + t2 * (y2 - y1));
};

export default descriptor({
    name: 'Line',
    schema,
    Component: Line,
    Creator: LineCreator,
    getDistance,
});