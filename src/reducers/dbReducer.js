import { dbConstants } from '../constants';

const defaultState = {
    dbs: [],
    connection: null,
    loadedConnections:[],
}

export const dbReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dbConstants.LOAD_DB_LIST:
            return {
                ...state,
                connection: action.connection,
                dbs: action.dbList,
                loadedConnections:[...state.loadedConnections,action.connection],
            }

      

        default:
            return state;
    }
}