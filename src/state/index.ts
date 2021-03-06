
import { shallowEqual, useSelector as useSelectorImpl } from "react-redux";
import { Reducer, combineReducers } from "redux";
import { AnyEntity, EntityTypeName } from "../tools";

export const createEntity = (entity: AnyEntity) => ({
    type: 'createEntity',
    entity,
});

const entities: Reducer<AnyEntity[]> = (state = [], action) => {
    switch (action.type) {
        case 'createEntity':
            return [...state, (action as any).entity];
        default:
            return state;
    }
};

export const highlightEntity = (entityId: number | null) => ({
    type: 'highlightEntity',
    entityId,
})

const highlightedEntity: Reducer<number | null> = (state = null, action) => {
    switch (action.type) {
        case 'highlightEntity':
            return action.entityId;
        default:
            return state;
    }
};

export const selectEntity = (entityId: number | null) => ({
    type: 'selectEntity',
    entityId,
})

const selectedEntity: Reducer<number | null> = (state = null, action) => {
    switch (action.type) {
        case 'selectEntity':
            return action.entityId;
        default:
            return state;
    }
};

export const setSelectedTool = (tool: null | EntityTypeName) => ({
    type: 'setSelectedTool',
    tool,
});

const selectedTool: Reducer<null | EntityTypeName> = (state = null, action) => {
    switch (action.type) {
        case 'setSelectedTool':
            return action.tool;
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    entities,
    highlightedEntity,
    selectedEntity,
    selectedTool,
});

export type State = ReturnType<typeof rootReducer>;

export const useSelector = <T extends object>(selector: (state: State) => T): T => {
    return useSelectorImpl(selector, shallowEqual);
};