import { FC } from "react";
import { Handler, Schema } from "../util/types";

export interface EntityType<T> {
    name: string;
    schema: (s: Schema) => Handler<T>;
    Component: FC<T>;
}

export const descriptor = <T,>(desc: EntityType<T>) => desc;

export type SchemaFC<S extends (...args: any) => any> = FC<ReturnType<S> extends Handler<infer T> ? T : never>;