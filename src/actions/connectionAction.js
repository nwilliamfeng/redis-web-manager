import {connectionConstants} from '../constants';
import {redisApi} from '../api'


export const connectionActions={
    loadConnectionList,

    
}



const loadConnectionList=()=>{
    return async dispatch=>{
        const lst =await redisApi.getConfigs();
        console.log(lst);
    }
}