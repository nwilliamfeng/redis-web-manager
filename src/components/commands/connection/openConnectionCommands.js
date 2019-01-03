import { connectionActions } from '../../../actions'
 

 

export const openConnectionCommand=({ dispatch, connectionId } )=>{
    dispatch(connectionActions.getDbList(connectionId));
}


 
 