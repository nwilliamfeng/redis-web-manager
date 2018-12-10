import { keyConstants, nodeTypes } from '../constants';

const defaultState = {
    keys: [],
    selectedKeyId: null,

}

let keyCache = [];

export const keyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case keyConstants.LOAD_KEY_LIST:
            const others= keyCache.filter(x=>x.connectionName!==action.connectionName && x.dbIdx!==action.dbIdx);??无法加载
            keyCache=[...others,...action.keyList];
            return {
                ...state,
                selectedKeyId: null,
                keys: action.keyList,

            }
        case nodeTypes.DB:       
            return {
                ...state,
                selectedKeyId: null,
                keys:[...keyCache.filter(x=>x.connectionName===action.connectionId && x.dbId===action.dbId)],

            }
        case nodeTypes.KEY:
            
            return {
                ...state,
                selectedKeyId:action.keyId,
                keys:[...keyCache.filter(x=>x.connectionName===action.connectionId && x.dbId===action.dbId)],
            }


        default:
            return state;
    }
}