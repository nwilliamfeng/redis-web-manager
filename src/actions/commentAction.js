import {commentConstants} from '../constants';
import {commentApi} from '../api'

export const commentActions={
    loadReplyList,



}


function loadReplyList(){
    return async dispatch=>{
        const replyData =await commentApi.getReplyList();
        
        dispatch({type:commentConstants.LOAD_REPLYS,replyData});
    }
}


 