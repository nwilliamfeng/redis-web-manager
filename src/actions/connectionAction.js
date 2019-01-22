import { connectionConstants, nodeTypes, connectionStates, dbConstants, dialogConstants } from '../constants';
import { redisApi } from '../api'
import { nodeHistory } from '../utils';


export const connectionActions = {

    loadConnectionList,

    selectConnection,

    updateConnectionState,

    getDbList,

    getDbLists,

    refreshDbList,

    deleteConnection,

    deleteConnections,

    addConnection,

    modifyConnection,

    updateSelectExpandState,

    selectRoot,
}

function updateSelectExpandState(connectionId, isExpand) {
    return { type: connectionConstants.EXPAND_STATE, connectionId, isExpand }
}

function loadConnectionList() {
    return async dispatch => {
        try {
            const connections = await redisApi.getConfigs();
            dispatch({ type: connectionConstants.LOAD_CONNECTION_LIST, connections });
        }
        catch (error) {
            const errorMessage = error.message.includes('Internal Server Error') ? '无法连接到服务器。' : error.message;
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage });
        }
    }
}

function getDbList(connectionId) {
    return async dispatch => {
        await doGetDbList(dispatch,connectionId);
    }
}

async function doGetDbList(dispatch,connectionId){
    dispatch({ type: connectionConstants.UPDATE_STATE, connectionId, connectionState: connectionStates.CONNECTING });
    try {
        const dbList = await redisApi.connect(connectionId);
        dispatch({ type: dbConstants.LOAD_DB_LIST, dbList, connectionId, connectionState: connectionStates.CONNECTED });
    }
    catch (error) {
        dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        dispatch({ type: connectionConstants.UPDATE_STATE, connectionId, connectionState: connectionStates.NONE });
    }
}

function getDbLists(connectionIds = []) {
    return async dispatch => {
      
            for (let connectionId of connectionIds) {
                await doGetDbList(dispatch,connectionId);
            }
 
    }
}


function deleteConnection(connectionId) {
    return async dispatch => {
        try {
            await redisApi.deleteConnection(connectionId);
            const connections = await redisApi.getConfigs();
            dispatch({ type: connectionConstants.LOAD_CONNECTION_LIST, connections });
            dispatch({ type: dialogConstants.CLOSE_DIALOG });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

function deleteConnections(connectionIds = []) {
    return async dispatch => {
        try {
            for (let id of connectionIds) {
                await redisApi.deleteConnection(id);
            }

            const connections = await redisApi.getConfigs();
            dispatch({ type: connectionConstants.LOAD_CONNECTION_LIST, connections });
            dispatch({ type: dialogConstants.CLOSE_DIALOG });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

function refreshDbList(connectionId) {
    return async dispatch => {
        dispatch({ type: connectionConstants.UPDATE_STATE, connectionId, connectionState: connectionStates.CONNECTING });
        try {
            const dbList = await redisApi.connect(connectionId);
            dispatch({ type: dbConstants.REFRESH_DB_LIST, dbList, connectionId, connectionState: connectionStates.CONNECTED });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
            dispatch({ type: dbConstants.LOAD_DB_LIST, dbList: [], connectionId, connectionState: connectionStates.NONE });
        }
    }
}

function updateConnectionState(connectionId, connectionState = connectionStates.NONE) {
    return { type: connectionConstants.UPDATE_STATE, connectionId, connectionState };
}

function selectConnection(connectionId) {
    nodeHistory.push({ nodeType: nodeTypes.CONNECTION, nodeValue: connectionId });
    return { type: nodeTypes.CONNECTION, connectionId };
}

function selectRoot() {
    nodeHistory.push({ nodeType: nodeTypes.ROOT, nodeValue: null });
    return { type: nodeTypes.ROOT };
}

function addConnection(name, ip, port, password) {
    return updateConnection(name, ip, port, password);
}

function updateConnection(name, ip, port, password, oldName) {
    return async dispatch => {
        try {
            if (oldName != null && name !== oldName) {
                await redisApi.deleteConnection(oldName);
            }
            await redisApi.setConnection(name, ip, port, password);
            const connections = await redisApi.getConfigs();
            dispatch({ type: connectionConstants.LOAD_CONNECTION_LIST, connections });
            dispatch({ type: dialogConstants.CLOSE_DIALOG });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR, errorMessage: error.message });
        }
    }
}

function modifyConnection(name, ip, port, password, oldName) {
    return updateConnection(name, ip, port, password, oldName);
}