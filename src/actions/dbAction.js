import { dbConstants,nodeTypes } from '../constants';
import { redisApi } from '../api'


export const dbActions = {

    getDbList,

    selectDB,
}



function getDbList(connectionName) {

    return async dispatch => {
        const dbList = await redisApi.connect(connectionName);
        dispatch({ type: dbConstants.LOAD_DB_LIST, dbList, connectionName });
    }
}

function selectDB(connectionId, dbId){
    return {type:nodeTypes.DB,connectionId,dbId};
}