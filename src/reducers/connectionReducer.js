import { connectionConstants, dbConstants, nodeTypes } from '../constants';

const defaultState = {
    connections: [],
    selectedConnectionId: null,
    isSelectedConnectionExpanded:false,
}

export const connectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case connectionConstants.EXPAND_STATE:
            return {
                ...state,
                isSelectedConnectionExpanded:action.isExpand,
            }
        case connectionConstants.LOAD_CONNECTION_LIST:
            return {
                ...state,
                selectedConnectionId: null,
                connections: action.connections,
                isSelectedConnectionExpanded:false,
            }
        case connectionConstants.UPDATE_STATE:
            return {
                ...state,
                selectedConnectionId: action.connectionId,
                connections: changeState(state.connections, action.connectionId, action.connectionState),
            }
        case dbConstants.LOAD_DB_LIST:
        case dbConstants.REFRESH_DB_LIST:
            return {
                ...state,
                connections: changeState(state.connections, action.connectionId, action.connectionState),
                isSelectedConnectionExpanded:true,
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

    const curr = connections[idx];
    const nw ={...curr,  connectionState};
    return [...connections.slice(0, idx), nw, ...connections.slice(idx + 1)]
}