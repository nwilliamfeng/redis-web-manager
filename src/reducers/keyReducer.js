import { keyConstants } from '../constants';

const defaultState = {
    keys: [],
    db: null,
    connection:null,
}

export const keyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case keyConstants.LOAD_KEY_LIST:
            return {
                ...state,
                db:action.db,     
                keys: action.keyList,
                connection:action.connection,
            }

        

        default:
            return state;
    }
}