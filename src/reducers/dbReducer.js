import { dbConstants, nodeTypes } from '../constants';

const defaultState = {
    dbs: [],
    selectedDb: null,
}

const dbCache = []

export const dbReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dbConstants.LOAD_DB_LIST:
            const exist = dbCache.find(x => x.connectionOfDb === action.connection);
            if (exist != null) {
                exist.dbs = action.dbList;
            }
            else {
                dbCache.push({ connectionOfDb: action.connection, dbs: action.dbList });
            }
            return {
                ...state,
                dbs: action.dbList,

            }

        case nodeTypes.CONNECTION:
            const current = dbCache.find(x => x.connectionOfDb === action.connection);
            if (current == null) {
                return {
                    ...state,
                    selectedDb: null,
                    dbs: [],
                }
            }
            return {
                ...state,
                selectedDb: null,
                dbs: current.dbs,

            }

        case nodeTypes.DB:
            const curr = dbCache.find(x => x.connectionOfDb === action.connection);

            if (curr == null) {
                return { ...state,dbs:[] };
            }
            return {
                ...state,
                selectedDb: action.db,
                dbs: curr.dbs,
            }

        case nodeTypes.KEY:
            const curr2 = dbCache.find(x => x.connectionOfDb === action.connection);

            if (curr2 == null) {
                return { ...state,dbs:[] };
            }
            return {
                ...state,
                selectedDb: action.db,
                dbs: curr2.dbs,
            }


        default:
            return state;
    }
}