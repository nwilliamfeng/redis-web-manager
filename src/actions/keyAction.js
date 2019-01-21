import { keyConstants, dialogConstants, keyType, keyHelper, entityState, keyTypeValue, nodeTypes } from '../constants';
import { redisApi } from '../api'
import { nodeHistory } from '../utils';


export const keyActions = {
    selectKey,
    deleteKey,
    deleteKeys,
    modifyStringKey,
    modifyKey,
    setSaveHandle,
    setKeyDirty,
    refreshKey,
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
            await redisApi.setKeyItem(type, key, null, value, connectionName, dbIdx);
            doRefreshKey(dispatch, { connectionName, dbIdx, dbId, key })

        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message })
        }
    }
}



function modifyKey(connectionName, dbIdx, type, id, keys = []) {
    return async dispatch => {
        try {

            for (let x of keys) {
                const { key, displayKey, value, state } = x;
                switch (state) {
                    case entityState.MODIFIED:
                        if (displayKey !== key || type === keyTypeValue.ZSET) { //如果不同说明key已经被更改，需要删除旧的key
                            if (type === keyTypeValue.ZSET) {
                                await redisApi.deleteZSetItem(key, type, id, connectionName, dbIdx);
                            }
                            else {
                                await redisApi.deleteKeyItem(key, type, id, connectionName, dbIdx);

                            }
                            await redisApi.setKeyItem(type, id, displayKey, value, connectionName, dbIdx);
                        }
                        else {
                            await redisApi.editKeyItem(type, id, displayKey, value, connectionName, dbIdx);
                        }
                        break;
                    case entityState.NEW:
                        await redisApi.setKeyItem(type, id, displayKey, value, connectionName, dbIdx);
                        break;
                    case entityState.DELETED:
                        if (type === keyTypeValue.ZSET) {
                            await redisApi.deleteZSetItem(key, type, id, connectionName, dbIdx);
                        }
                        else {
                            await redisApi.deleteKeyItem(key, type, id, connectionName, dbIdx);
                        }

                        break;
                    default:
                        break;
                }
            };
            const keyContent = await redisApi.getKeyItems(connectionName, dbIdx, type, id);
            dispatch({ type: keyConstants.RELOAD_KEY_CONTENT, keyContent });
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
    nodeHistory.push({ nodeType: nodeTypes.KEY, nodeValue: redisKey });
    return async dispatch => {
        try {
            const { connectionName, dbIdx, dbId, id } = redisKey;
            const keyContent = await getKeyValue(redisKey);

            dispatch({ type: keyConstants.SELECT_KEY, connectionId: connectionName, dbId, dbIdx, keyId: id, keyContent });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

function getKeyValue(redisKey) {
    const { type, connectionName, dbIdx, key } = redisKey;
    if (type === keyType.STRING) {
        return redisApi.getStringKeyValue(connectionName, dbIdx, key);
    }
    else {
        return redisApi.getKeyItems(connectionName, dbIdx, keyHelper.getKeyTypeValue(type), key);
    }
}

function refreshKey(redisKey) {
    return async dispatch => {
        try {
            doRefreshKey(dispatch,redisKey);
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

async function  doRefreshKey(dispatch, redisKey) {
    const { connectionName, dbIdx, dbId, key } = redisKey;
    const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId, key);
    const rkey = keyList.length > 0 ? keyList[0] : null;

    const keyContent = rkey ? await getKeyValue(rkey) : null;
    dispatch({ type: keyConstants.REFRESH_KEY, key: rkey, connectionName, dbIdx, oldKeyName: key, keyContent: keyContent });
}
