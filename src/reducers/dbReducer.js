import { dbConstants } from '../constants';

const defaultState = {
    dbs: [],
    connection: null,
}

export const dbReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dbConstants.LOAD_DB_LIST:
            return {
                ...state,
                connection:action.connection,     
                dbs: action.dbList,

            }

        

        default:
            return state;
    }
}