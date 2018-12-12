import {commentConstants,Pages} from '../constants';
import {commentApi} from '../api'

export const commentActions={
    loadReplyList,

    directToCommentPage,

    loadCommentList,

}


function loadReplyList(postid,replyid){
    return async dispatch=>{
        dispatch({type:commentConstants.DIRECT_PAGE,page:Pages.REPLY});
        const replyData =await commentApi.getReplys(postid,replyid);
        
        dispatch({type:commentConstants.LOAD_REPLYS,replyData});
    }
}

function loadCommentList(sortType=-1,page=1,pageSize=20){
    return async dispatch=>{
        const commentData =await commentApi.getComments(sortType,page,pageSize);
        
        dispatch({type:commentConstants.LOAD_COMMENTS,commentData,sortType,page,pageSize});
    }
}

function directToCommentPage(page){
    return {type:commentConstants.DIRECT_PAGE,page};
}


 