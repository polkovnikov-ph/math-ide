import React, { FC, useMemo } from "react";
import { Title } from "./pure/title";

import { Forest, ModelTree } from './pure/tree';
import { useSelector } from "./state";
import { AnyEntity } from "./tools";

const toForest = (entities: AnyEntity[]): ModelTree[] => (
    entities.map((entity) => ({
        columns: [entity.name],
        children: [],
    }))
);

export const EntityList: FC = () => {
    const { entities, /*selectedEntity*/ } = useSelector(({ entities, selectedEntity }) => ({ entities, selectedEntity }));

    const forest = useMemo(() => toForest(entities), [entities]);

    return (
        <>
            <Title text="Entities" />
            <Forest forest={forest} />
        </>
    );
};