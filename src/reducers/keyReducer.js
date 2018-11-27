import { keyConstants } from '../constants';

const defaultState = {
    keys: [],
    dbOfKey: null,
    connectionOfKey:null,
}

export const keyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case keyConstants.LOAD_KEY_LIST:
            return {
                ...state,
                dbOfKey:action.db,     
                keys: action.keyList,
                connectionOfKey:action.connection,
            }

        default:
            return state;
    }
}