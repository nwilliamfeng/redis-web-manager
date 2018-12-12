import { commentConstants, Pages } from '../constants';

const defaultState = {
    commentData: null,
    replyData: null,
    page: Pages.COMMENT,
    commentSortType:-1,
    commentPage:1,
    commentPageSize:10,
}

export const commentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case commentConstants.LOAD_REPLYS:
            return {
                ...state,

                replyData: action.replyData,
            }
        case commentConstants.LOAD_COMMENTS:
            return {
                ...state,
                sortType:action.sortType,
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