import {commandConstants} from '../constants'

export const commandAction={
    openListView,
    closeListView,
}

function openListView(){
    return {type:commandConstants.OPEN_LIST_VIEW};
}

function closeListView(){
    return {type:commandConstants.CLOSE_LIST_VIEW};
}