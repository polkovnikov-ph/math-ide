import { Handler, Schema } from "../util/types";
import * as line from './line';

export const entitySchema = (s: Schema) => ({
    line: line.schema(s),
});

type SchemaT = ReturnType<typeof entitySchema>

export type Entity = {
    [K in keyof SchemaT]: { 
        type: K, 
        fields: SchemaT[K] extends Handler<infer T> ? T : never,
    }
}[keyof SchemaT]