import React, { FC, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Title } from "./pure/title";

import { Forest, ModelTree } from './pure/tree';
import { selectEntity, useSelector } from "./state";
import { AnyEntity } from "./tools";

const toForest = (entities: AnyEntity[], selectedEntity: number | null): ModelTree<number>[] => (
    entities.map((entity, index) => ({
        columns: [entity.name],
        children: [],
        isSelected: index === selectedEntity,
        value: index,
    }))
);

export const EntityList: FC = () => {
    const { entities, selectedEntity } = useSelector(({ entities, selectedEntity }) => ({ entities, selectedEntity }));

    const forest = useMemo(() => toForest(entities, selectedEntity), [entities, selectedEntity]);

    const dispatch = useDispatch();
    const handleSelect = useCallback((entityId: number) => {
        dispatch(selectEntity(entityId))
    }, [dispatch]);

    return (
        <>
            <Title text="Entities" />
            <Forest<number> forest={forest} onClick={handleSelect} />
        </>
    );
};