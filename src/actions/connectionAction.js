import {connectionConstants} from '../constants';
import {redisApi} from '../api'


export const connectionActions={

    loadConnectionList,

    selectConnection,
}



 function loadConnectionList(){
    return async dispatch=>{
        const connections =await redisApi.getConfigs();
        dispatch({type:connectionConstants.LOAD_CONNECTION_LIST,connections});
    }
}

function selectConnection(connectionName){
    return {type:connectionConstants.SELECT_CONNECTION,connectionName};
}