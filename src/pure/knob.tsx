import React, {FC} from "react";

type Props = {
    x: number;
    y: number;
}

export const Knob: FC<Props> = ({x, y}) => {
    return <circle cx={x} cy={y} r={4} fill="black" />;
};