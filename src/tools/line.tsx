import { Schema } from "../util/types";
import { descriptor, SchemaFC } from "./common";

const schema = (s: Schema) => (
    s.object({
        x1: s.number,
        y1: s.number,
        x2: s.number,
        y2: s.number,
    })
);

const Line: SchemaFC<typeof schema> = ({x1, y1, x2, y2}) => {
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
    );
};

export default descriptor({
    name: 'Line',
    schema,
    Component: Line,
});