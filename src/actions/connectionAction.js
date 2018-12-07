import {connectionConstants,nodeTypes,connectionStates,dbConstants} from '../constants';
import {redisApi} from '../api'


export const connectionActions={

    loadConnectionList,

    selectConnection,

    updateConnectionState,

    getDbList,
}



 function loadConnectionList(){
    return async dispatch=>{
        const connections =await redisApi.getConfigs();
        dispatch({type:connectionConstants.LOAD_CONNECTION_LIST,connections});
    }
}

function getDbList(connectionId) {
    return async dispatch => {
        dispatch({type:connectionConstants.UPDATE_STATE,connectionId,connectionState:connectionStates.CONNECTING});
        const dbList = await redisApi.connect(connectionId);
        dispatch({ type: dbConstants.LOAD_DB_LIST, dbList, connectionId,connectionState:connectionStates.CONNECTED });
    }
}

function updateConnectionState(connectionId,connectionState=connectionStates.NONE){
    return {type:connectionConstants.UPDATE_STATE,connectionId,connectionState};
}

function selectConnection(connectionId){
    return {type:nodeTypes.CONNECTION,connectionId};
}