import { keyConstants, dialogConstants, keyType, keyHelper } from '../constants';
import { redisApi } from '../api'


export const keyActions = {
    selectKey,
    deleteKey,
    deleteKeys,
    modifyStringKey,
    modifyKey,
    setSaveHandle,
    setKeyDirty,
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


function setSaveHandle(saveHandle) {
    return { type: keyConstants.SET_KEY_SAVE_HANDLE, saveHandle };
}


function deleteKeys(connectionName, dbIdx, keys, dbId) {
    return async dispatch => {
        try {
            keys.forEach(key => {
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


function modifyStringKey(connectionName, dbIdx, dbId, type, key, value, oldKey) {
    return async dispatch => {
        try {
            await redisApi.deleteKey(oldKey, connectionName, dbIdx);
            await redisApi.edit(type, key, null, value, connectionName, dbIdx);
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
          
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message })
        }
    }
}

function modifyKey(connectionName, dbIdx, dbId, type, id, key, value) {
    return async dispatch => {
        try {
            await redisApi.edit(type, id, key, value, connectionName, dbIdx);
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });
        
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message })
        }
    }
}

function setKeyDirty() {
    return { type: keyConstants.SET_KEY_DIRTY_STATE }
}

function selectKey(redisKey) {
    return async dispatch => {
        try {
            let keyContent;
            const { type, connectionName, dbIdx, dbId, id, key } = redisKey;
            if (type === keyType.STRING) {
                keyContent = await redisApi.getStringKeyValue(connectionName, dbIdx, key);
            }
            else {
                keyContent = await redisApi.getKeyItems(connectionName, dbIdx, keyHelper.getKeyTypeValue(type), key);
            }

            dispatch({ type: keyConstants.SELECT_KEY, connectionId: connectionName, dbId, dbIdx, keyId: id, keyContent });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}