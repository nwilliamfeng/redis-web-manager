import { dbConstants, nodeTypes } from '../constants';

const defaultState = {
    dbs: [],
    selectedDbId: null,
}

let dbCache = []

export const dbReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dbConstants.LOAD_DB_LIST:
            const others =dbCache.filter(x=>x.connectionName!==action.connectionName);
            dbCache=[...others,...action.dbList];
            return {
                ...state,
                dbs: action.dbList,

            }

        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedDbId: null,
                dbs:[ ...dbCache.filter(x=>x.connectionName===action.connectionId)],

            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedDbId: action.dbId,
                dbs:[...dbCache.filter(x=>x.connectionName===action.connectionId)],
            }

        case nodeTypes.KEY:
        
            return {
                ...state,
                selectedDbId: action.dbId,
                dbs:[...dbCache.filter(x=>x.connectionName===action.connectionId)],
            }


        default:
            return state;
    }
}