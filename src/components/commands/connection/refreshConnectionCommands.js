import { connectionActions } from '../../../actions'
 

/**
 * 刷新Connection命令
 * @param {*} param0 
 */
export const refreshConnectionCommand=({ dispatch, connectionId } )=>{
    dispatch(connectionActions.refreshDbList(connectionId));
}

export const refreshConnectionsCommand=({ dispatch } )=>{
    dispatch(connectionActions.loadConnectionList());
}

 
 
 