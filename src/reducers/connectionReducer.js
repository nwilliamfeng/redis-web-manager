import { connectionConstants } from '../constants';

const defaultState = {
    connections: [],
}

export const connectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case connectionConstants.LOAD_CONNECTION_LIST:
            return {
                ...state,
                connections: action.connections,             
            }

        

        default:
            return state;
    }
}