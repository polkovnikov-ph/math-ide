import React, {FC, useMemo, useRef} from "react";
import { Selector } from "./selector";
import { useSelector } from "./state";
import { typeToCreator, typeToRender } from "./tools";

export const Editor: FC = () => {
    const {
        entities,
        selectedTool,
        highlightedEntity,
        // selectedEntity,
     } = useSelector(({
         entities, selectedTool, highlightedEntity
    }) => ({
        entities, selectedTool, highlightedEntity
    }));

    const body = useMemo(() => (
        entities.map((entity, index) => {
            const Component = typeToRender(entity.type);
            const state = index === highlightedEntity ? 'highlighted' : 'normal';
            return <Component key={index} fields={entity.fields} state={state} />;
        })
    ), [entities, highlightedEntity]);

    const Creator = useMemo(() => {
        return selectedTool
            ? typeToCreator(selectedTool)
            : Selector;
    }, [selectedTool]);

    const svgRef = useRef<SVGSVGElement>(null);

    return (
        <svg ref={svgRef} width="1000" height="1000">
            {body}
            {<Creator containerRef={svgRef} />}
        </svg>
    );
};