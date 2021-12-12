import { FC, RefObject, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createEntity } from "../state";
import { handlers } from "../util/types";
import { ValuesOf } from "../util/utils";
import { Entity, EntityType } from "./common";
import line from './line';

export const entityTypes = {
    line,
};

type EntityTypesList = typeof entityTypes
export type EntityTypeName = keyof EntityTypesList

export const typeToHandler = <K extends EntityTypeName>(type: K) => {
    return entityTypes[type].schema(handlers)
};

export const typeToRender = <K extends EntityTypeName>(type: K) => {
    return entityTypes[type].Component;
};

export const typeToCreator = <K extends EntityTypeName>(type: K) => {
    const {Creator} = entityTypes[type];
    const CommonCreator: FC<{
        containerRef: RefObject<SVGSVGElement>;
    }> = ({containerRef}) => {
        const dispatch = useDispatch();
        const handleCreateEntity = useCallback((fields) => {
            dispatch(createEntity({
                type,
                name: type,
                fields,
            }));
            // dispatch(selectEntity(???))
        }, [dispatch]);
        return <Creator containerRef={containerRef} onCreateEntity={handleCreateEntity} />;
    };
    return CommonCreator;
};

export type AnyEntity = ValuesOf<{
    [K in keyof EntityTypesList]: Entity<
        K, 
        EntityTypesList[K] extends EntityType<infer T> ? T : never
    >
}>