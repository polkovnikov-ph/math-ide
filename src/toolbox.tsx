import React, {FC, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "./pure/title";
import { setSelectedTool, State } from "./state";
import { entityTypes } from "./tools";

export const Toolbox: FC = () => {
    const dispatch = useDispatch();

    const selectedTool = useSelector((state: State) => state.selectedTool);

    const handleSetTool = useCallback((e) => {
        dispatch(setSelectedTool(e.target.value || null));
    }, [dispatch]);

    const tools = [
        [null, {name: 'Select'}] as const,
        ...Object.entries(entityTypes),
    ]
        .map(([internalName, {name}]) => (
            <div key={internalName}>
                <label>
                    <input
                        type="radio"
                        value={internalName || undefined}
                        checked={selectedTool === internalName}
                        onChange={handleSetTool}
                    />
                    {name}
                </label>
            </div>
        ));

    return (
        <>
            <Title text="Toolbox" />
            <div>
                {tools}
            </div>
        </>
    );
};