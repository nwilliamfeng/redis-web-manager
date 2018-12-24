import { dialogConstants } from '../constants';

const defaultState = {
    dialogType: dialogConstants.NONE,
    title: null,
    renderContent: null,
    renderForm:null,
    onConfirm: null,

}


export const dialogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dialogConstants.OPEN_CONFIRM_DIALOG:
            return {
                ...state,
                dialogType: action.type,
                title: action.title,
                renderContent: action.renderContent,
                renderForm:null,
                onConfirm: action.onConfirm,
                size:action.size,
            }
        case dialogConstants.OPEN_FORM_DIALOG:
            return {
                ...state,
                dialogType: action.type,
                title: action.title,
                renderContent: null,
                onConfirm: null,
                renderForm:action.renderForm,
                size:action.size,
            }
        case dialogConstants.CLOSE_DIALOG:
            return {
                ...state,
                dialogType: dialogConstants.NONE,
                title: null,
                renderContent: null,
                onConfirm: null,
       
            }

        default:
            return state;
    }
}