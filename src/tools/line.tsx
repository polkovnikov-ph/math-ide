import React from "react";
import { Schema } from "../util/types";
import type {SchemaFC} from '.';

export const schema = (s: Schema) => (
    s.object({
        x1: s.number,
        y1: s.number,
        x2: s.number,
        y2: s.number,
    })
);

export const Component: SchemaFC<typeof schema> = ({x1, y1, x2, y2}) => {
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} />
    );
};