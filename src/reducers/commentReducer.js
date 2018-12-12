import { commentConstants, Pages } from '../constants';

const defaultState = {
    commentData: null,
    replyData: null,
    page: Pages.COMMENT,
    commentSortType:-1,
    commentPage:1,
    commentPageSize:10,
    replySortType:-1,
    replyPage:1,
    replyPageSize:3,

    postId:null,
    replyId:null,
  
}

export const commentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case commentConstants.LOAD_REPLYS:
            return {
                ...state,

                replyData: action.replyData,
                replySortType:action.sortType,
               
                replyPage:action.page,
                replyPageSize:action.pageSize,
                postId:action.postId,
                replyId:action.replyId,
            }
        case commentConstants.LOAD_COMMENTS:
            return {
                ...state,
                commentSortType:action.sortType,
                commentData: action.commentData,
                commentPage:action.page,
                commentPageSize:action.pageSize,

            }

        case commentConstants.DIRECT_PAGE:
            return {
                ...state,

                page: action.page,
            }

        default:
            return state;
    }
}