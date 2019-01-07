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
            const needClearSaveHandle = !checkIfSameKeyType(action.keyId, state);
            return {
                ...state,
                selectedKeyId: action.keyId,
                keys: [...keyCache.filter(x => x.connectionName === action.connectionId && x.dbId === action.dbId)],
                selectedkeyContent: action.keyContent,
                saveKeyHandle: needClearSaveHandle === true ? null : state.saveKeyHandle,
                isKeyDirty: false,
            }

        default:
            return state;
    }
}

function checkIfSameKeyType(selectedKeyId, state) {
    const oldKeyId = state.selectedKeyId;
    if (oldKeyId == null) {
        return false;
    }
    return state.keys.find(x => x.id === oldKeyId).type === keyCache.find(x => x.id === selectedKeyId).type;
}