import { keyActions } from '../../../actions'

/**
 * 刷新Key命令
 * @param {*} param0 
 */
export const refreshKeyCommand=({dispatch, redisKey } )=>{
    dispatch(keyActions.refreshKey(redisKey));
}

