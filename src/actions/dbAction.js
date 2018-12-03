import { dbConstants,nodeTypes } from '../constants';
import { redisApi } from '../api'


export const dbActions = {

    getDbList,

    selectDB,
}



function getDbList(connectionName) {

    return async dispatch => {
        const dbList = await redisApi.connect(connectionName);
        dispatch({ type: dbConstants.LOAD_DB_LIST, dbList, connection: connectionName });
    }
}

function selectDB(connection, dbIdx){
    return {type:nodeTypes.DB,connection,db:dbIdx};
}