import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { connectionActions } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'
import { refreshConnectionCommand,openConnectionCommand } from '../commands'
  


const Trigger = withContextMenuTrigger(contextMenuIds.CONNECTION_CONTEXTMENU_ID);

export const ConnectionMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const { dispatch, connection } = props;
        switch (data.action) {
            case commandConstants.CONNECT_CONNECTION:
                openConnectionCommand({dispatch,connection});
                break;
            case commandConstants.REFRESH_CONNECTION:
                refreshConnectionCommand({ dispatch, connectionId: connection });
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