import { nodeTypes } from '../constants'
import { locator } from '../utils'
import {keyActions} from './keyAction'
export const navigateAction = {
    selectByArrow,
}


const getSelectValue = data => {
    if (data.node == null) {
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
        const nxd = locator.getNextNodeFromConnection(props);
        return getSelectValue(nxd);
    }
    else if (selectedNodeType === nodeTypes.DB) {
        const nxd = locator.getNextNodeFromDb(props);
        return getSelectValue(nxd);
    }

    console.log('return empty');
    return empty;
}

