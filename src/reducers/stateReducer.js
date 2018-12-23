import { nodeTypes, commandConstants, tabPaneIds } from '../constants';
import { findIndex } from 'lodash';

const defaultState = {
    selectedNodeType: nodeTypes.ROOT,
    tabPanes: [tabPaneIds.LIST_VIEW_PANE, tabPaneIds.SETTING_PANE],
    activeTabPane: tabPaneIds.LIST_VIEW_PANE,
}

export const stateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedNodeType: action.type,
            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedNodeType: action.type,
            }

        case nodeTypes.KEY:
            return {
                ...state,
                selectedNodeType: action.type,
            }

        case commandConstants.OPEN_TAB:
            return doOpenTabPane(state,action.tabPaneId);

        case commandConstants.CLOSE_TAB:
            return doCloseTabPane(state,action.tabPaneId);

        case commandConstants.SELECT_TAB:
            return doSelectTabPane(state,action.tabPaneId);

        default:
            return state;
    }
}

function doSelectTabPane(state,tabPaneId){
    return {...state,activeTabPane:tabPaneId};
}

function doOpenTabPane(state,tabPaneId) {
    let { tabPanes, activeTabPane } = state;

    if (tabPanes.some(x => x === tabPaneId) === false) {
        tabPanes = [tabPaneId, ...tabPanes];
        activeTabPane = tabPaneId;
    }
    return {
        ...state,
        tabPanes: tabPanes,
        activeTabPane: activeTabPane,
    }
}

function doCloseTabPane(state,tabPaneId) {
    let { tabPanes, activeTabPane } = state;
    const idx = findIndex(tabPanes, x => x === tabPaneId);
    if (idx < 0) {
        return state;
    }
    tabPanes = [
        ...tabPanes.slice(0, idx),
        ...tabPanes.slice(idx + 1)
    ];
    if (activeTabPane === tabPaneId) {
        activeTabPane = tabPanes.length > 0 ? tabPanes[0] : null;
    }
    return {
        ...state,
        tabPanes: tabPanes,
        activeTabPane,
    }
}