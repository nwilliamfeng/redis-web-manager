import { keyConstants } from '../constants';
import { redisApi } from '../api'


export const keyActions = {
    getKeyList,

    selectKey,
}

function getKeyList(connectionName,dbIdx) {
    return async dispatch => {
        const keyList = await redisApi.getKeyTypes(connectionName,dbIdx);
        dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connection: connectionName ,db:dbIdx});
    }
}

function selectKey(connection,dbIdx,keyName){
    return {type:keyConstants.SELECT_KEY,connection,db:dbIdx,key:keyName};
}