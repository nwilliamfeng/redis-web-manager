import {dialogConstants} from '../constants'

export const dialogAction={
    openConfirm,
    openForm,
    closeDialog,
}

function openConfirm(title,renderContent,onConfirm){
    return {type:dialogConstants.OPEN_CONFIRM_DIALOG,title,renderContent,onConfirm};
}

function openForm(title,renderForm){
    return {type:dialogConstants.OPEN_FORM_DIALOG,title,renderForm};
}

function closeDialog(){
    return {type:dialogConstants.CLOSE_DIALOG};
}
