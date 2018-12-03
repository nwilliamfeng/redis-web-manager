import { nodeTypes, commandConstants, tabPaneTypes } from '../constants';
import { findIndex } from 'lodash';

const defaultState = {
    selectedNodeType: nodeTypes.ROOT,
    selectedConnection: null,
    selectedDB: null,
    selectedKey: null,
    tabPanes: [tabPaneTypes.LIST_VIEW_PANE],
    activeTabPane: tabPaneTypes.LIST_VIEW_PANE,
}

export const stateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case nodeTypes.CONNECTION:
            return {
                ...state,
                selectedNodeType: action.type,
                selectedConnection: action.connection,
                selectedDB: null,
                selectedKey: null,

            }

        case nodeTypes.DB:
            return {
                ...state,
                selectedNodeType: action.type,
                selectedConnection: action.connection,
                selectedDB: action.db,
                selectedKey: null,

            }

        case nodeTypes.KEY:
            return {
                ...state,
                selectedNodeType: action.type,
                selectedConnection: action.connection,
                selectedDB: action.db,
                selectedKey: action.key,
            }

        case commandConstants.OPEN_LIST_VIEW:
            return doOpenListView(state);

        case commandConstants.CLOSE_LIST_VIEW:
             return doCloseListView(state);

        default:
            return state;
    }
}

function doOpenListView(state){
    let { tabPanes, activeTabPane } = state;

    if (tabPanes.some(x => x === tabPaneTypes.LIST_VIEW_PANE) === false) {
        tabPanes = [tabPaneTypes.LIST_VIEW_PANE, ...tabPanes];
        activeTabPane = tabPaneTypes.LIST_VIEW_PANE;
    }
    return {
        ...state,
        tabPanes: tabPanes,
        activeTabPane: activeTabPane,
    }
}

function doCloseListView(state) {  
    let { tabPanes, activeTabPane } = state;
    const idx = findIndex(tabPanes, x => x === tabPaneTypes.LIST_VIEW_PANE);
    if (idx < 0) {
        return state;
    }
    tabPanes = [
        ...tabPanes.slice(0, idx),
        ...tabPanes.slice(idx + 1)
    ];
    if (activeTabPane === tabPaneTypes.LIST_VIEW_PANE) {
        activeTabPane = tabPanes.length > 0 ? tabPanes[0] : null;
    }
    return {
        ...state,
        tabPanes: tabPanes,
        activeTabPane: activeTabPane,
    }
}