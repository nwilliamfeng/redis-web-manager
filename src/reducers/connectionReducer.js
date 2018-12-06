import { connectionConstants, nodeTypes } from '../constants';

const defaultState = {
    connections: [],
    selectedConnectionId: null,
}

export const connectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case connectionConstants.LOAD_CONNECTION_LIST:
            return {
                ...state,
                selectedConnectionId: null,
                connections: action.connections,
            }

        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedConnectionId: action.connectionId,
            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedConnectionId: action.connectionId,
            }

        case nodeTypes.KEY:
            return {
                ...state,
                selectedConnectionId: action.connectionId,
            }

        default:
            return state;
    }
}