import {commandConstants,tabPaneIds} from '../constants'

export const commandAction={
    openTabPane,
    closeTabPane,
    selectTabPane,
}

function openTabPane(tabPaneId){
    return {type:commandConstants.OPEN_TAB,tabPaneId};
}

function closeTabPane(tabPaneId){
    return {type:commandConstants.CLOSE_TAB,tabPaneId};
}

function selectTabPane(tabPaneId){
    return {type:commandConstants.SELECT_TAB,tabPaneId};
}