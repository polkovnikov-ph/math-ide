import React, {FC} from "react";

type Props = {
    x: number;
    y: number;
    onDrag?: (x: number, y: number) => void;
    onEndDrag?: (x: number, y: number) => void;
}

export const Knob: FC<Props> = ({x, y}) => {
    return <circle cx={x} cy={y} r={4} fill="black" />;
};