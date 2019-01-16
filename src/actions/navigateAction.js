import { nodeTypes } from '../constants'
import { locator } from '../utils'
import {keyActions} from './keyAction'
export const navigateAction = {
    selectByArrow,
}


const getSelectValue = data => {
    if (data.node == null) {
        console.log('sds');
        return { type: '' };
    }
    switch (data.nodeType) {
        case nodeTypes.CONNECTION:
            return { type: nodeTypes.CONNECTION, connectionId: data.node.id };
        case nodeTypes.DB:
            return { type: nodeTypes.DB, connectionId: data.node.connectionName, dbId: data.node.id };
        case nodeTypes.KEY:
      
            return keyActions.selectKey(data.node);
        default:
            return { type: '' };
    }
}

function selectByArrow(props, isArrowDown = true) {
    const { selectedNodeType } = props;

    const empty = { type: '' };
    if (selectedNodeType === nodeTypes.ROOT) {
        const { connections } = props;
        if (connections.length > 0) {
            return { type: nodeTypes.CONNECTION, connectionId: connections[0].id };
        }
    }


    if (selectedNodeType === nodeTypes.CONNECTION) {
        const nd =isArrowDown===true?  locator.getNextNodeFromConnection(props) : locator.getPreviousNodeFromConnection(props);
        return getSelectValue(nd);
    }
    else if (selectedNodeType === nodeTypes.DB) {
        const nd =isArrowDown===true? locator.getNextNodeFromDb(props):locator.getPreviousNodeFromDb(props);
        return getSelectValue(nd);
    }
    else if (selectedNodeType === nodeTypes.KEY) {
        const nd = isArrowDown===true? locator.getNextNodeFromKey(props):locator.getPreviousNodeFromKey(props);
        return getSelectValue(nd);
    }

    console.log('return empty');
    return empty;
}

