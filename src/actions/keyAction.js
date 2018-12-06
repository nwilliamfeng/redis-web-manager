import { keyConstants } from '../constants';
import { redisApi } from '../api'


export const keyActions = {
    getKeyList,

    selectKey,
}

function getKeyList(connectionName,dbIdx,dbId) {
    return async dispatch => {
        const keyList = await redisApi.getKeyTypes(connectionName,dbIdx,dbId);
        dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connection: connectionName ,db:dbIdx});
    }
}

function selectKey(connectionId,dbId,dbIdx,keyId){
    return {type:keyConstants.SELECT_KEY,connectionId,dbId,dbIdx,keyId};
}