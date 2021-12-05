import { Tag } from "../util/hkt";
import { Schema } from "../util/schema";

export const schema = <F extends Tag>(s: Schema<F>) => (
    s.object({
        x1: s.number,
        y1: s.number,
        x2: s.number,
        y2: s.number,
    })
);