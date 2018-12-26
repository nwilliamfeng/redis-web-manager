import { dialogConstants } from '../constants';

const defaultState = {
    dialogType: dialogConstants.NONE,
    title: null,
    renderContent: null,
    renderForm: null,
    attachMessage: null,
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
                size: action.size,
                attachMessage: null,
            }
        case dialogConstants.OPEN_FORM_DIALOG:
            return {
                ...state,
                dialogType: action.type,
                title: action.title,
                renderContent: null,
                renderForm: action.renderForm,
                size: action.size,
                attachMessage: null,
            }
        case dialogConstants.CLOSE_DIALOG:
            return {
                ...state,
                dialogType: dialogConstants.NONE,
                title: null,
                renderContent: null,
                attachMessage: null,
            }
        case dialogConstants.SHOW_ERROR:
            return {
                ...state,
                dialogType: action.type,
                title: '错误提醒',
                renderContent: ()=>action.errorMessage,
                attachMessage:null,
            }
        case dialogConstants.SHOW_ERROR_ATTACH:
            return {
                ...state,
                attachMessage:action.errorMessage,
            }

        default:
            return state;
    }
}