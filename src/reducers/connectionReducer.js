import { connectionConstants } from '../constants';

const defaultState = {
    connections: [],
    selectedName: null,
}

export const connectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case connectionConstants.LOAD_CONNECTION_LIST:
            return {
                ...state,
                connections: action.connections,

            }

        case connectionConstants.SELECT_CONNECTION:
            return {
                ...state,
                selectedName: action.connectionName,

            }

        default:
            return state;
    }
}