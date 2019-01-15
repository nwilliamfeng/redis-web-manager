import { nodeTypes } from '../constants'
import { locator } from '../utils'

export const navigateAction = {
    selectByArrow,
}




function selectByArrow(props, isArrowDown = true) {
    const { selectedNodeType } = props;

    switch (selectedNodeType) {
        case nodeTypes.ROOT: {
            const { connections } = props;
            if (connections.length > 0) {
                return { type: nodeTypes.CONNECTION, connectionId: connections[0].id };
            }
        }
        //case nodeTypes.CONNECTION:
        // const conn =isArrowDown===true? locator.getNextConnection(props) :locator.getPreviousConnection(props);
        // if (conn != null) {
        //     return { type: nodeTypes.CONNECTION, connectionId: conn.id };
        // }

        case nodeTypes.CONNECTION:
        case nodeTypes.DB:
            const nd = locator.getNextNode(props);
            if (nd != null) {
                {
                    switch (nd.nodeType) {
                        case nodeTypes.CONNECTION:
                            return { type: nodeTypes.CONNECTION, connectionId: nd.node.id };
                        case nodeTypes.DB:
                            return { type: nodeTypes.DB, connectionId: nd.node.connectionName,dbId:nd.node.id };
                    }
                }
            }

        case nodeTypes.KEY:
            return { type: '' };

    }

    return { type: '' };
}

