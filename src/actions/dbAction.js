import { nodeTypes } from '../constants';
 

export const dbActions = {
 
    selectDB,
}





function selectDB(connectionId, dbId){
    return {type:nodeTypes.DB,connectionId,dbId};
}