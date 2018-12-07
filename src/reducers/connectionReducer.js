import { connectionConstants, dbConstants, nodeTypes, connectionStates } from '../constants';

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
        case connectionConstants.UPDATE_STATE:
        
            return {
                ...state,
                selectedConnectionId: action.connectionId,
                connections: changeState(state.connections,action.connectionId,action.connectionState),
            }
        case dbConstants.LOAD_DB_LIST:
            return {
                ...state,
                connections: changeState(state.connections,action.connectionId,action.connectionState),
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

 

function changeState(connections, id, connectionState) {
    const idx = connections.findIndex(x => x.id === id);
  
    let curr = connections[idx];
    curr.connectionState = connectionState;
    return [...connections.slice(0, idx), curr, ...connections.slice(idx + 1)]
}