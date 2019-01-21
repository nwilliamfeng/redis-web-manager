import { dbConstants, nodeTypes, dbStates, keyConstants, connectionConstants } from '../constants';

const defaultState = {
    dbs: [],
    selectedDbId: null,
}

let dbCache = []



export const dbReducer = (state = defaultState, action) => {
    switch (action.type) {
        case connectionConstants.LOAD_CONNECTION_LIST:
            dbCache = [];
            return {
                ...state,
                selectedDbId: null,
                dbs: [],
            }
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
            const sdbs = changeState(state.dbs, action.dbId, action.dbState);
            const isExpand = action.dbState === dbStates.KEY_LOAD_SUCCESS ? true : false;
            return {
                ...state,
                selectedDbId: action.dbId,
                dbs: changeExpandState(sdbs, action.dbId, isExpand),
            }

        case dbConstants.DB_EXPAND:
            return {
                ...state,
                dbs: changeExpandState(state.dbs, action.dbId, action.isExpand),
            }

        case keyConstants.LOAD_KEY_LIST:
            const cdbs = changeStateWithDbIdx(state.dbs, action.connectionName, action.dbIdx);
            const id = cdbs.find(x => x.connectionName === action.connectionName && x.dbIdx === action.dbIdx).id;
            return {
                ...state,
                dbs: changeExpandState(cdbs, id, true),
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

function changeExpandState(dbs, id, isExpand) {
    const idx = dbCache.findIndex(x => x.id === id);
    const curr = dbCache[idx];
    const nxt = { ...curr, isExpand };
    dbCache = [...dbCache.slice(0, idx), nxt, ...dbCache.slice(idx + 1)];

    const idx2 = dbs.findIndex(x => x.id === id);
    return [...dbs.slice(0, idx2), nxt, ...dbs.slice(idx2 + 1)];
}

function changeStateWithDbIdx(dbs, connectionName, dbIdx) {
    const db = dbCache.find(x => x.connectionName === connectionName && x.dbIdx === dbIdx);
    if (db == null) {
        return [];
    }
    return changeState(dbs, db.id, dbStates.KEY_LOAD_SUCCESS);
}