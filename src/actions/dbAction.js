import { nodeTypes, dbStates, dbConstants, keyConstants } from '../constants';
import { redisApi } from '../api'

export const dbActions = {

    /**
     * 选中db
     */
    selectDB,

    updateDbState,

    getKeyList,

    deleteKey,

    addKey,
}



function updateDbState(dbId, dbState = dbStates.NONE) {
    return { type: dbConstants.UPDATE_DB_STATE, dbId, dbState };
}

function getKeyList(connectionName, dbIdx, dbId) {
    return async dispatch => {
        dispatch({ type: dbConstants.UPDATE_DB_STATE, dbId, dbState: dbStates.KEY_LOADING });
        const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
        dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
    }
}

function deleteKey(connectionName, dbIdx, key, dbId) {
    return async dispatch => {

        await redisApi.deleteKey(key, connectionName, dbIdx);
        const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
        dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
    }
}


function addKey(connectionName, dbIdx, key, keyValue, type, dbId) {
    return async dispatch => {

        await redisApi.appendKey(key, keyValue, type, connectionName, dbIdx);
        const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
        dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
    }
}



function selectDB(connectionId, dbId) {
    return { type: nodeTypes.DB, connectionId, dbId };
}