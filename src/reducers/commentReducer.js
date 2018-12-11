import { commentConstants } from '../constants';

const defaultState = {
    comments:[],
    replyData:null
}

export const commentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case commentConstants.LOAD_REPLYS:
            return {
                ...state,
                
                replyData:action.replyData,
            }

        

        default:
            return state;
    }
}