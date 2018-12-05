import { dbConstants, nodeTypes } from '../constants';

const defaultState = {
    dbs: [],
    connectionOfDb: null,
    loadedConnections: [],
}

const dbCache = []

export const dbReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dbConstants.LOAD_DB_LIST:
            const exist = dbCache.find(x => x.connectionOfDb === action.connection );
            if (exist != null) {
                exist.dbs = action.dbList;
            }
            else {
                dbCache.push({ connectionOfDb: action.connection,  dbs: action.dbList });
            }
            return {
                ...state,
                connectionOfDb: action.connection,
                dbs: action.dbList,
                loadedConnections: [...state.loadedConnections, action.connection],
            }

        case nodeTypes.CONNECTION:
            const current = dbCache.find(x => x.connectionOfDb === action.connection);
            if (current == null) {
                return { ...state };
            }
            return {
                ...state,
                connectionOfDb: action.connection,
                dbs: current.dbs,

            }

        default:
            return state;
    }
}