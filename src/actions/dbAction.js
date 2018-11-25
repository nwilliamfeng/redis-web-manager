import { dbConstants } from '../constants';
import { redisApi } from '../api'


export const dbActions = {

    getDbList,


}



function getDbList(connectionName) {

    return async dispatch => {
        const dbList = await redisApi.connect(connectionName);
        dispatch({ type: dbConstants.LOAD_DB_LIST, dbList, connection: connectionName });
    }
}

// function selectConnection(connectionName){
//     return {type:connectionConstants.SELECT_CONNECTION,connectionName};
// }