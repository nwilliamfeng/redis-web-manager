import { nodeTypes, dbStates, dbConstants, keyConstants, dialogConstants } from '../constants';
import { dialogAction } from './dialogAction'
import { redisApi } from '../api'
import { nodeHistory } from '../utils';

export const dbActions = {

    /**
     * 选中db
     */
    selectDB,

    updateDbState,

    getKeyList,

    getKeyListByKeyword,

    updateSelectedDbExpandState ,

    addKey,


}


function updateSelectedDbExpandState(dbId,isExpand) {
    return { type: dbConstants.DB_EXPAND,dbId, isExpand };
}

function updateDbState(dbId, dbState = dbStates.NONE) {
    return { type: dbConstants.UPDATE_DB_STATE, dbId, dbState };
}

function getKeyList(connectionName, dbIdx, dbId) {
    return async dispatch => {
        dispatch({ type: dbConstants.UPDATE_DB_STATE, dbId, dbState: dbStates.KEY_LOADING });
        try {
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

function getKeyListByKeyword(connectionName, dbIdx, dbId,keyword) {
    return async dispatch => {
        dispatch({ type: dbConstants.UPDATE_DB_STATE, dbId, dbState: dbStates.KEY_LOADING });
        try {
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId,keyword);
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

function addKey(connectionName, dbIdx, dbId, type, id, key, value) {
    return async dispatch => {
        try {
            await redisApi.setKeyItem(type, id, key, value, connectionName, dbIdx);
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch(dialogAction.closeDialog());
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: error.message })
        }
    }
}


function selectDB(connectionId, dbId) {
    nodeHistory.push({ nodeType: nodeTypes.DB,nodeValue:{ connectionId, dbId} });
    return { type: nodeTypes.DB, connectionId, dbId };
}

