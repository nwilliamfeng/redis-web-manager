import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'

import { withContextMenuTrigger } from './withMenuTrigger'
import { refreshConnectionCommand,modifyConnectionCommand, openConnectionCommand, deleteConnectionCommand } from '../commands'



const Trigger = withContextMenuTrigger(contextMenuIds.CONNECTION_CONTEXTMENU_ID);

export const ConnectionMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const { dispatch, connection } = props;
        switch (data.action) {
            case commandConstants.CONNECT_CONNECTION:
                openConnectionCommand({ dispatch, connectionId:connection });
                break;
            case commandConstants.REFRESH_CONNECTION:
                refreshConnectionCommand({ dispatch, connectionId: connection });
                break;
            case commandConstants.EDIT_CONNECTION:
                modifyConnectionCommand({ dispatch,...props.data,oldName:connection});
                break;
            case commandConstants.DELETE_CONNECTION:
                deleteConnectionCommand({ dispatch, connectionId: connection });
                break;
            default:
                break;
        }
    }
    const isRefreshEnable = () => {
        const { isConnected } = props;
        return isConnected;
    }

    return <Trigger {...props} isRefreshEnable={isRefreshEnable()} onItemClick={handleItemClick} />
} 