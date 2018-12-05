import { keyConstants, nodeTypes } from '../constants';

const defaultState = {
    keys: [],
    selectedKey: null,

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
                selectedKey: null,
                keys: action.keyList,

            }
        case nodeTypes.DB:
            const current = keyCache.find(x => x.connectionOfKey === action.connection && x.dbOfKey === action.db);
            if (current == null) {
                return { ...state,keys:[] };
            }
            return {
                ...state,
                selectedKey: null,
                keys: current.keys,

            }
        case nodeTypes.KEY:
            const curr = keyCache.find(x => x.connectionOfKey === action.connection && x.dbOfKey===action.db);

            if (curr == null) {
                return { ...state };
            }
            return {
                ...state,
                selectedKey:action.key,
                keys: curr.keys,
            }


        default:
            return state;
    }
}