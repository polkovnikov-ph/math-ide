import React, {FC, useMemo} from "react";
import { useSelector } from "./state";
import { typeToRender } from "./tools";

export const Editor: FC = () => {
    const { entities, /*selectedEntity*/ } = useSelector(({ entities }) => ({ entities }));

    const body = useMemo(() => (
        entities.map(entity => {
            const Component = typeToRender(entity.type);
            return <Component {...entity.fields} />;
        })
    ), [entities]);

    return (
        <svg width="1000" height="1000">
            {body}
        </svg>
    );
};