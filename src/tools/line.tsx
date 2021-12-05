import { Schema } from "../util/types";

export const schema = (s: Schema) => (
    s.object({
        x1: s.number,
        y1: s.number,
        x2: s.number,
        y2: s.number,
    })
);