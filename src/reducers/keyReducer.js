import { keyConstants, nodeTypes, dbConstants } from '../constants';

const defaultState = {
    keys: [],
    selectedKeyId: null,
    selectedkeyContent: null,
    saveKeyHandle: null,
    isKeyDirty: false,//键是否被更改
}

let keyCache = [];

export const keyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case keyConstants.SET_KEY_DIRTY_STATE:
            return {
                ...state,
                isKeyDirty: true,
            }


        case keyConstants.SET_KEY_SAVE_HANDLE:
            return {
                ...state,
                saveKeyHandle: action.saveHandle,
                isKeyDirty: false,
            }
        case keyConstants.LOAD_KEY_LIST:

            const others = keyCache.filter(x => x.connectionName !== action.connectionName || x.dbIdx !== action.dbIdx);
            keyCache = [...others, ...action.keyList];
            const oldSelectedKeyId = state.selectedKeyId;
            const existSelect = action.keyList.some(x => x.id === oldSelectedKeyId) === true;
            return {
                ...state,
                selectedKeyId: existSelect ? oldSelectedKeyId : null,
                keys: action.keyList,
                isKeyDirty: false,
            }

        case keyConstants.REFRESH_KEY:
            const idx = keyCache.findIndex(x => x.connectionName === action.connectionName && x.dbIdx === action.dbIdx && x.key === action.oldKeyName);
            keyCache = action.key ? [...keyCache.slice(0, idx), action.key, ...keyCache.slice(idx + 1)] : [...keyCache.slice(0, idx), ...keyCache.slice(idx + 1)];
            const keys = keyCache.filter(x => x.connectionName === action.connectionName && x.dbIdx === action.dbIdx);
            return {
                ...state,
                selectedKeyId: keyCache.some(x => x.id === state.selectedKeyId) === true ? state.selectedKeyId : null,
                selectedkeyContent:action.keyContent,
                keys,
                isKeyDirty: false,
            }


        case dbConstants.REFRESH_DB_LIST:
            const others2 = keyCache.filter(x => x.connectionName !== action.connectionId);
            keyCache = [...others2];
            return {
                ...state,
                selectedKeyId: null,
                keys: [],
                selectedkeyContent: null,
                saveKeyHandle: null,
                isKeyDirty: false,
            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedKeyId: null,
                keys: [...keyCache.filter(x => x.connectionName === action.connectionId && x.dbId === action.dbId)],
                selectedkeyContent: null,
                saveKeyHandle: null,
                isKeyDirty: false,
            }
        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedKeyId: null,
                keys: [],
                selectedkeyContent: null,
                saveKeyHandle: null,
                isKeyDirty: false,
            }
        case nodeTypes.KEY:
            return {
                ...state,
                selectedKeyId: action.keyId,
                keys: [...keyCache.filter(x => x.connectionName === action.connectionId && x.dbId === action.dbId)],
                selectedkeyContent: action.keyContent,
                isKeyDirty: false,
            }
        case keyConstants.RELOAD_KEY_CONTENT:
            return {
                ...state,
                selectedkeyContent: action.keyContent,
                isKeyDirty: false,
            }

        default:
            return state;
    }
}

