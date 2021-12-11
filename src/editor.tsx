import React, {FC, useMemo, useRef} from "react";
import { useSelector } from "./state";
import { typeToCreator, typeToRender } from "./tools";

export const Editor: FC = () => {
    const { entities, selectedTool, /*selectedEntity*/ } = useSelector(({ entities, selectedTool }) => ({ entities, selectedTool }));

    const body = useMemo(() => (
        entities.map((entity, index) => {
            const Component = typeToRender(entity.type);
            return <Component key={index} {...entity.fields} />;
        })
    ), [entities]);

    // const dispatch = useDispatch();
    // dispatch(createEntity({
    //     name: 'Line',
    //     type: 'line',
    //     fields: rect,
    // }))

    const Creator = useMemo(() => {
        return selectedTool
            ? typeToCreator(selectedTool)
            : undefined;
    }, [selectedTool]);

    const svgRef = useRef<SVGSVGElement>(null);

    return (
        <svg ref={svgRef} width="1000" height="1000">
            {body}
            {Creator ? <Creator containerRef={svgRef} /> : null}
        </svg>
    );
};