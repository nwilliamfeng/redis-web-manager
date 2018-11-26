import { selectNodeType } from '../constants';

const defaultState = {
    selectNodeType:selectNodeType.SELECT_CONNECTION,
}

export const stateReducer = (state = defaultState, action) => {
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