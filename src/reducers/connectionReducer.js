import { connectionConstants, nodeTypes } from '../constants';

const defaultState = {
    connections: [],
    selectedConnectionName: null,
}

export const connectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case connectionConstants.LOAD_CONNECTION_LIST:
            return {
                ...state,
                selectedConnectionName: null,
                connections: action.connections,
            }

        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedConnectionName: action.connection,
            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedConnectionName:action.connection,
            }

        default:
            return state;
    }
}