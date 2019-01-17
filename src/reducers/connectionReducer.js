import { connectionConstants, dbConstants, nodeTypes, connectionStates } from '../constants';

const defaultState = {
    connections: [],
    selectedConnectionId: null,
}

export const connectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case connectionConstants.EXPAND_STATE:
            return {
                ...state,
                connections: changeExpandState(state.connections, action.connectionId, action.isExpand),
            }


        case connectionConstants.LOAD_CONNECTION_LIST:
            return {
                ...state,
                selectedConnectionId: null,
                connections: action.connections,

            }
        case connectionConstants.UPDATE_STATE:
            const conns = changeState(state.connections, action.connectionId, action.connectionState);
            const isExpand = action.connectionState === connectionStates.CONNECTED;
            return {
                ...state,
                selectedConnectionId: action.connectionId,
                connections: changeExpandState(conns, action.connectionId, isExpand),
            }
        case dbConstants.LOAD_DB_LIST:
        case dbConstants.REFRESH_DB_LIST:
            return {
                ...state,
                connections: changeExpandState(changeState(state.connections, action.connectionId, action.connectionState), action.connectionId, true),

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

        case nodeTypes.ROOT:
            return {
                ...state,
                selectedConnectionId: null,
                connections: [...state.connections],

            }

        default:
            return state;
    }
}



function changeState(connections, id, connectionState) {
    const idx = connections.findIndex(x => x.id === id);

    const curr = connections[idx];
    const nw = { ...curr, connectionState };
    return [...connections.slice(0, idx), nw, ...connections.slice(idx + 1)]
}

function changeExpandState(connections, id, isExpand) {
    const idx = connections.findIndex(x => x.id === id);
    const curr = connections[idx];
    const nw = { ...curr, isExpand };
    return [...connections.slice(0, idx), nw, ...connections.slice(idx + 1)]
}