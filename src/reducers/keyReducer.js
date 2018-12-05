import { keyConstants, nodeTypes } from '../constants';

const defaultState = {
    keys: [],
    dbOfKey: null,
    connectionOfKey: null,
}

const keyCache = [];

export const keyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case keyConstants.LOAD_KEY_LIST:
            const exist = keyCache.find(x => x.connectionOfKey === action.connection && x.dbOfKey === action.db);
            if (exist != null) {
                exist.keys = action.keyList;
            }
            else {
                keyCache.push({ connectionOfKey: action.connection, dbOfKey: action.db, keys: action.keyList });
            }
            return {
                ...state,
                dbOfKey: action.db,
                keys: action.keyList,
                connectionOfKey: action.connection,
            }
        case nodeTypes.DB:
            const current = keyCache.find(x => x.connectionOfKey === action.connection && x.dbOfKey === action.db);
            if (current == null) {
                return {...state};
            }
            return {
                ...state,
               
                connectionOfKey: action.connection,
                dbOfKey: action.db,
                keys: current.keys,

            }


        default:
            return state;
    }
}