import { commandConstants } from '../constants';

const defaultState = {
    commandName:null,
    commandParameter:null,
}

export const commandReducer = (state = defaultState, action) => {
    switch (action.type) {
        case commandConstants.CLOSE_LIST_VIEW:
            return {
                ...state,
                commandName:action.type,
                

            }

        

        default:
            return state;
    }
}