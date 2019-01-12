import { keyConstants, dialogConstants, keyType, keyHelper, entityState } from '../constants';
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
            await redisApi.setKeyItem(type, key, null, value, connectionName, dbIdx);
            const keyList = await redisApi.getKeyTypes(connectionName, dbIdx, dbId);
            dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connectionName, dbIdx });

        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message })
        }
    }
}


// function modifyKey(connectionName, dbIdx, type, id, keys = []) {
//     return async dispatch => {
//         try {
//             keys.forEach(async x => {
//                 const { key, displayKey, value, state } = x;
//                 switch (state) {
//                     case entityState.MODIFIED:
//                         if (displayKey !== key) { //如果不同说明key已经被更改，需要删除旧的key
//                             console.log(1);
//                             await redisApi.deleteKeyItem(key, type, id, connectionName, dbIdx);
//                             console.log(2);
//                             await redisApi.setKeyItem(type, id, displayKey, value, connectionName, dbIdx);
//                             console.log(3);
//                         }
//                         else {
//                             await redisApi.editKeyItem(type, id, displayKey, value, connectionName, dbIdx);
//                         }
//                         break;
//                     case entityState.NEW:
//                         await redisApi.setKeyItem(type, id, displayKey, value, connectionName, dbIdx);
//                         break;
//                     case entityState.DELETED:
//                         await redisApi.deleteKeyItem(key, type, id, connectionName, dbIdx);
//                         break;
//                     default:
//                         break;
//                 }
//             });
//             console.log(4);
//             const keyContent = await redisApi.getKeyItems(connectionName, dbIdx, type, id);
//             console.log(5);
//             console.log(keyContent);
//             dispatch({ type: keyConstants.RELOAD_KEY_CONTENT, keyContent });
//         }
//         catch (error) {
//             dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message })
//         }
//     }
// }

function modifyKey(connectionName, dbIdx, type, id, keys = []) {
    return async dispatch => {
        try {

            for (let x of keys) {
                const { key, displayKey, value, state } = x;
                switch (state) {
                    case entityState.MODIFIED:
                        if (displayKey !== key) { //如果不同说明key已经被更改，需要删除旧的key
                            console.log(1);
                            await redisApi.deleteKeyItem(key, type, id, connectionName, dbIdx);
                            console.log(2);
                            await redisApi.setKeyItem(type, id, displayKey, value, connectionName, dbIdx);
                            console.log(3);
                        }
                        else {
                            await redisApi.editKeyItem(type, id, displayKey, value, connectionName, dbIdx);
                        }
                        break;
                    case entityState.NEW:
                        await redisApi.setKeyItem(type, id, displayKey, value, connectionName, dbIdx);
                        break;
                    case entityState.DELETED:
                        await redisApi.deleteKeyItem(key, type, id, connectionName, dbIdx);
                        break;
                    default:
                        break;
                }
            };
            console.log(4);
            const keyContent = await redisApi.getKeyItems(connectionName, dbIdx, type, id);
            console.log(5);
            console.log(keyContent);
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