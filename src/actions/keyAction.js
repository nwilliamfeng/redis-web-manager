import { keyConstants } from '../constants';
import { redisApi } from '../api'


export const keyActions = {

    getKeyList,


}



function getKeyList(connectionName,dbIdx) {
    return async dispatch => {
        const keyList = await redisApi.getKeyTypes(connectionName,dbIdx);
        dispatch({ type: keyConstants.LOAD_KEY_LIST, keyList, connection: connectionName ,dbIdx});
    }
}

// function selectConnection(connectionName){
//     return {type:connectionConstants.SELECT_CONNECTION,connectionName};
// }