import { dialogConstants } from '../constants';

const defaultState = {
    dialogType: dialogConstants.NONE,
    title: null,
    renderContent: null,
    renderForm: null,
    onConfirm: null,
    errorMessage: null,
}


export const dialogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case dialogConstants.OPEN_CONFIRM_DIALOG:
            return {
                ...state,
                dialogType: action.type,
                title: action.title,
                renderContent: action.renderContent,
                renderForm: null,
                onConfirm: action.onConfirm,
                size: action.size,
                errorMessage:null,
            }
        case dialogConstants.OPEN_FORM_DIALOG:
            return {
                ...state,
                dialogType: action.type,
                title: action.title,
                renderContent: null,
                onConfirm: null,
                renderForm: action.renderForm,
                size: action.size,
                errorMessage:null,
            }
        case dialogConstants.CLOSE_DIALOG:
            return {
                ...state,
                dialogType: dialogConstants.NONE,
                title: null,
                renderContent: null,
                onConfirm: null,
                errorMessage:null,
            }
        case dialogConstants.SHOW_ERROR_DETAIL:
            return {
                ...state,
                dialogType: action.type,
                title: null,
                renderContent: null,
                onConfirm: null,
                errorMessage:action.errorMessage,
            }

        default:
            return state;
    }
}