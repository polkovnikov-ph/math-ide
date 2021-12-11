import { FC, useCallback } from "react";
import { GetType, Schema } from "../util/types";
import { useSelection } from "../util/use-selection";
import { CreatorFC, descriptor } from "./common";

const schema = (s: Schema) => (
    s.object({
        x1: s.number,
        y1: s.number,
        x2: s.number,
        y2: s.number,
    })
);

type Fields = GetType<typeof schema>

const Line: FC<Fields> = ({x1, y1, x2, y2}) => {
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
    );
};

const LineCreator: CreatorFC<Fields> = ({containerRef, onCreateEntity}) => {
    const handleSelect = useCallback((rect) => {
        onCreateEntity(rect);
    }, [onCreateEntity]);

    const rect = useSelection(containerRef, handleSelect);

    return rect ? (
        <g>
            <Line {...rect} />
            <circle cx={rect.x1} cy={rect.y1} r={4} fill="black" />
            <circle cx={rect.x2} cy={rect.y2} r={4} fill="blue" />
        </g>
    ) : null;
};

export default descriptor({
    name: 'Line',
    schema,
    Component: Line,
    Creator: LineCreator,
});