import { connectionActions } from '../../../actions'
 

 

export const openConnectionCommand=({ dispatch, connectionId } )=>{
    dispatch(connectionActions.getDbList(connectionId));
}

export const openConnectionsCommand=({ dispatch, connectionIds } )=>{
    dispatch(connectionActions.getDbLists(connectionIds));
}
 
 