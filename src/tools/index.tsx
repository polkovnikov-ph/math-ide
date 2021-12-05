import { FC } from "react";
import { Handler, handlers, Schema } from "../util/types";
import * as line from './line';

export type SchemaFC<S extends (...args: any) => any> = FC<ReturnType<S> extends Handler<infer T> ? T : never>;

const entitySchema = (s: Schema) => ({
    line: line.schema(s),
});
const components = {
    line: line.Component,
};

export const typeToHandler = entitySchema(handlers);
export const typeToRender = (type: Entity["type"]) => components[type];

type SchemaT = ReturnType<typeof entitySchema>

export type Entity = {
    [K in keyof SchemaT]: { 
        name: string,
        type: K,
        fields: SchemaT[K] extends Handler<infer T> ? T : never,
    }
}[keyof SchemaT]