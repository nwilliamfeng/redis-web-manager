import {dialogConstants} from '../constants'

export const dialogAction={
    openConfirm,
    openForm,
    closeDialog,
    showError,
}

function openConfirm(title,renderContent,size){
    return {type:dialogConstants.OPEN_CONFIRM_DIALOG,title,renderContent,size};
}

function openForm(title,renderForm,size){
    return {type:dialogConstants.OPEN_FORM_DIALOG,title,renderForm,size};
}

function closeDialog(){
    return {type:dialogConstants.CLOSE_DIALOG};
}

function showError(errorMessage){
    return {type:dialogConstants.SHOW_ERROR,errorMessage};
}
