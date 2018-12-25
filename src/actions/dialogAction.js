import {dialogConstants} from '../constants'

export const dialogAction={
    openConfirm,
    openForm,
    closeDialog,
    showErrorMessage,
}

function openConfirm(title,renderContent,onConfirm,size){
    return {type:dialogConstants.OPEN_CONFIRM_DIALOG,title,renderContent,onConfirm,size};
}

function openForm(title,renderForm,size){
    return {type:dialogConstants.OPEN_FORM_DIALOG,title,renderForm,size};
}

function closeDialog(){
    return {type:dialogConstants.CLOSE_DIALOG};
}

function showErrorMessage(errorMessage){??
    return {type:dialogConstants.SHOW_ERROR_DETAIL,errorMessage};
}
