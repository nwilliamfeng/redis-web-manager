import { dbConstants, nodeTypes, dbStates, keyConstants } from '../constants';


const defaultState = {
    dbs: [],
    selectedDbId: null,
}

let dbCache = []



export const dbReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dbConstants.LOAD_DB_LIST:
        case dbConstants.REFRESH_DB_LIST:
            const others = dbCache.filter(x => x.connectionName !== action.connectionId);
            dbCache = [...others, ...action.dbList];
            return {
                ...state,
                dbs: action.dbList,
            }

      

        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedDbId: null,
                dbs: [...dbCache.filter(x => x.connectionName === action.connectionId)],

            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedDbId: action.dbId,
                dbs: [...dbCache.filter(x => x.connectionName === action.connectionId)],
            }

        case nodeTypes.KEY:

            return {
                ...state,
                selectedDbId: action.dbId,
                dbs: [...dbCache.filter(x => x.connectionName === action.connectionId)],
            }

        case dbConstants.UPDATE_DB_STATE:
            return {
                ...state,
                selectedDbId: action.dbId,
                dbs: changeState(state.dbs,action.dbId, action.dbState),
            }

        case keyConstants.LOAD_KEY_LIST:
            return {
                ...state,
                dbs: changeStateWithDbIdx(state.dbs,action.connectionName, action.dbIdx),
            }

        default:
            return state;
    }
}

function changeState(dbs, id, dbState) {
    const idx = dbCache.findIndex(x => x.id === id);
    const curr = dbCache[idx];
    const nxt = { ...curr, dbState };
    dbCache = [...dbCache.slice(0, idx), nxt, ...dbCache.slice(idx + 1)];

    const idx2 = dbs.findIndex(x => x.id === id);
    return [...dbs.slice(0, idx2), nxt, ...dbs.slice(idx2 + 1)];
}

function changeStateWithDbIdx(dbs,connectionName, dbIdx) {
    const db = dbCache.find(x => x.connectionName === connectionName && x.dbIdx === dbIdx);
    if (db == null) {
        return [];
    }
    return changeState(dbs,db.id, dbStates.KEY_LOAD_SUCCESS);
}