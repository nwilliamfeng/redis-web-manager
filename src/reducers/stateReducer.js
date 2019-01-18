import { nodeTypes, commandConstants, tabPaneIds, multiNodeConstants, connectionConstants } from '../constants';
import { findIndex } from 'lodash';

const defaultState = {
    selectedNodeType: nodeTypes.ROOT,
    tabPanes: [tabPaneIds.LIST_VIEW_PANE],
    activeTabPane: tabPaneIds.LIST_VIEW_PANE,
    multiSelectItems: [],
}

export const stateReducer = (state = defaultState, action) => {
    switch (action.type) {

        case nodeTypes.ROOT:
        case nodeTypes.CONNECTION:
        case nodeTypes.DB:
            return {
                ...state,
                selectedNodeType: action.type,
                multiSelectItems: [],
            }

       
        case nodeTypes.KEY:
            return {
                ...doOpenTabPane(state, tabPaneIds.KEY_SETTING_VIEW_PANE),
                selectedNodeType: action.type,
                multiSelectItems: [],

            }

        case multiNodeConstants.MULTI_SELECT:
            return {
                ...state,
                multiSelectItems: action.nodes,
            }
        case connectionConstants.LOAD_CONNECTION_LIST:
            return {
                ...state,
                selectedNodeType: nodeTypes.ROOT,
                multiSelectItems: [],
            }

        case commandConstants.OPEN_TAB:
            return doOpenTabPane(state, action.tabPaneId);

        case commandConstants.CLOSE_TAB:
            return doCloseTabPane(state, action.tabPaneId);

        case commandConstants.SELECT_TAB:
            return doSelectTabPane(state, action.tabPaneId);

        default:
            return state;
    }
}

function doSelectTabPane(state, tabPaneId) {
    return { ...state, activeTabPane: tabPaneId };
}

function doOpenTabPane(state, tabPaneId) {
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

function doCloseTabPane(state, tabPaneId) {
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