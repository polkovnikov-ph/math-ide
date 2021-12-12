import './editor.css';
import React, {FC, useMemo, useRef} from "react";
import { bem } from "@bem-modules/bem";
import { Selector } from "./selector";
import { useSelector } from "./state";
import { typeToCreator, typeToRender } from "./tools";

const b = bem('editor');

export const Editor: FC = () => {
    const {
        entities,
        selectedTool,
        highlightedEntity,
        selectedEntity,
     } = useSelector(({
        entities, selectedTool, highlightedEntity, selectedEntity,
    }) => ({
        entities, selectedTool, highlightedEntity, selectedEntity,
    }));

    const body = useMemo(() => (
        entities.map((entity, index) => {
            const Component = typeToRender(entity.type);
            const state = index === selectedEntity
                ? 'selected'
                : index === highlightedEntity
                ? 'highlighted'
                : 'normal';
            return <Component key={index} fields={entity.fields} state={state} />;
        })
    ), [entities, highlightedEntity, selectedEntity]);

    const Creator = useMemo(() => {
        return selectedTool
            ? typeToCreator(selectedTool)
            : Selector;
    }, [selectedTool]);

    const svgRef = useRef<SVGSVGElement>(null);

    const isSelecting = !selectedTool;

    return (
        <svg className={b({isSelecting})} ref={svgRef} width="1000" height="1000">
            {body}
            {<Creator containerRef={svgRef} />}
        </svg>
    );
};