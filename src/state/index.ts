
import { shallowEqual, useSelector as useSelectorImpl } from "react-redux";
import { Reducer, combineReducers } from "redux";
import { Entity } from "../tools";

export const createEntity = (entity: Entity) => ({
    type: 'createEntity',
    entity,
});

const entities: Reducer<Entity[]> = (state = [], action) => {
    switch (action.type) {
        case 'createEntity':
            return [...state, (action as any).entity];
        default:
            return state;
    }
};

const selectedEntity: Reducer<number | null> = (state = null, action) => {
    return state;
};

export const rootReducer = combineReducers({
    entities,
    selectedEntity,
});

export type State = ReturnType<typeof rootReducer>;

export const useSelector = <T extends object>(selector: (state: State) => T): T => {
    return useSelectorImpl(selector, shallowEqual);
};