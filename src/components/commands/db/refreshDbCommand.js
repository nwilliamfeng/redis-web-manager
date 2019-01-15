import { dbActions } from '../../../actions'

/**
 * 刷新Db命令
 * @param {*} param0 
 */
export const refreshDbCommand=({ dispatch, dbIdx, connectionName, dbId } )=>{
    dispatch(dbActions.getKeyList(connectionName, dbIdx, dbId));
}

