import {connectionConstants} from '../constants';


export const connectionReducer=(state={},action)=>{
    switch(action.type){
        case connectionConstants.LOAD_CONNECTION_LIST:
         return {            
             ...state,
             connections:action.connections,

         }

         default: 
            return state;
    }
}