import { keyConstants, nodeTypes, dbConstants } from '../constants';

const defaultState = {
    keys: [],
    selectedKeyId: null,
    selectedKeyBody: null,
    saveKeyHandle: null,
}

let keyCache = [];

export const keyReducer = (state = defaultState, action) => {
    switch (action.type) {

        case keyConstants.SET_KEY_SAVE_HANDLE:
            return {
                ...state,
                saveKeyHandle: action.saveHandle,
            }
        case keyConstants.LOAD_KEY_LIST:

            const others = keyCache.filter(x => x.connectionName !== action.connectionName || x.dbIdx !== action.dbIdx);
            keyCache = [...others, ...action.keyList];
            const oldSelectedKeyId = state.selectedKeyId; 
            const existSelect = action.keyList.some(x => x.id === oldSelectedKeyId) === true;
            return {
                ...state,
                selectedKeyId: existSelect ? oldSelectedKeyId :null,
                keys: action.keyList,
                selectedKeyBody:  null,
               
            }


        case dbConstants.REFRESH_DB_LIST:
            const others2 = keyCache.filter(x => x.connectionName !== action.connectionId);
            keyCache = [...others2];
            return {
                ...state,
                selectedKeyId: null,
                keys: [],
                selectedKeyBody: null,
                saveKeyHandle: null,
            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedKeyId: null,
                keys: [...keyCache.filter(x => x.connectionName === action.connectionId && x.dbId === action.dbId)],
                selectedKeyBody: null,
                saveKeyHandle: null,

            }
        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedKeyId: null,
                keys: [],
                selectedKeyBody: null,
                saveKeyHandle: null,
            }
        case nodeTypes.KEY:

            return {
                ...state,
                selectedKeyId: action.keyId,
                keys: [...keyCache.filter(x => x.connectionName === action.connectionId && x.dbId === action.dbId)],
                selectedKeyBody: action.keyBody,
             
            }

        default:
            return state;
    }
}