import { keyConstants } from '../constants';



export const keyActions = {
    

    selectKey,
}



function selectKey(connectionId,dbId,dbIdx,keyId){
    return {type:keyConstants.SELECT_KEY,connectionId,dbId,dbIdx,keyId};
}