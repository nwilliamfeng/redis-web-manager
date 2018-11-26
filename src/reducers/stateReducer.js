import { selectNodeType } from '../constants';

const defaultState = {
    selectedNodeType:selectNodeType.SELECT_CONNECTION,
    selectedConnection:null,
    selectedDB:null,
    selectedKey:null,

}

export const stateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case selectNodeType.SELECT_CONNECTION:
            return {
                ...state,
                selectedNodeType:action.type,
                selectedConnection:action.connection,
                selectedDB:null,
                selectedKey:null,

            }

        case selectNodeType.SELECT_DB:
            return {
                ...state,
                selectedNodeType:action.type,
                selectedConnection:action.connection,
                selectedDB:action.db,
                selectedKey:null,

            }

        default:
            return state;
    }
}