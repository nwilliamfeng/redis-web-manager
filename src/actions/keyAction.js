import { keyConstants,dialogConstants } from '../constants';
import { dialogAction } from './dialogAction'
import { redisApi } from '../api'


export const keyActions = {
    
    selectKey,
    deleteKey,
    deleteKeys,
    modifyStringKey,
   
}


function deleteKey(connectionName, dbIdx, key, dbId) {
    return async dispatch => {
        try {
            await redisApi.deleteKey(key, connectionName, dbIdx);
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
            dispatch({ type: dialogConstants.CLOSE_DIALOG });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

 

function deleteKeys(connectionName, dbIdx, keys, dbId) {
    return async dispatch => {
        try {
            keys.forEach(key=>{
                 redisApi.deleteKey(key, connectionName, dbIdx);
            });
           
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
            dispatch({ type: dialogConstants.CLOSE_DIALOG });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

 

function modifyStringKey(connectionName, dbIdx, dbId, type,  key,value) {
    return async dispatch => {
        try {
            await redisApi.deleteKey(key, connectionName, dbIdx);
            await redisApi.appendKey(type, key,null,  value, connectionName, dbIdx);
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch(dialogAction.closeDialog());
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: error.message })
        }
    }
}


function selectKey(connectionId,dbId,dbIdx,keyId){
    return {type:keyConstants.SELECT_KEY,connectionId,dbId,dbIdx,keyId};
}