import { handlers } from "../util/types";
import { EntityType } from "./common";
import line from './line';

const entityTypes = {
    line,
};

type EntityTypeName = keyof typeof entityTypes;

export const typeToHandler = <K extends EntityTypeName>(type: K) => {
    return entityTypes[type].schema(handlers)
};

export const typeToRender = <K extends EntityTypeName>(type: K) => {
    return entityTypes[type].Component;
};

type EntityTypesList = typeof entityTypes

export type Entity = {
    [K in keyof EntityTypesList]: {
        name: string;
        type: K;
        fields: EntityTypesList[K] extends EntityType<infer T> ? T : never
    }
}[keyof EntityTypesList]