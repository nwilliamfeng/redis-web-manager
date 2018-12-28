import { connectionActions } from '../../actions'

/**
 * 刷新Connection命令
 * @param {*} param0 
 */
export const refreshRedisConnectionCommand=({ dispatch, connectionId } )=>{
    dispatch(connectionActions.refreshDbList(connectionId));
}

