import { FC, RefObject } from "react";
import { Handler, Schema } from "../util/types";

export interface EntityType<T> {
    name: string;
    schema: (s: Schema) => Handler<T>;
    Component: FC<T>;
    Creator: CreatorFC<T>;
}

export const descriptor = <T,>(desc: EntityType<T>) => desc;

export type CreatorFC<T> = FC<{
    containerRef: RefObject<SVGSVGElement>;
    onCreateEntity: (entity: T) => void;
}>

export type Entity<Type, Fields> = {
    type: Type;
    name: string;
    fields: Fields;
}