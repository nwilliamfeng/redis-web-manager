import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { connect } from 'react-redux'
import { withContextMenuTrigger } from './withMenuTrigger'
import { refreshConnectionCommand, modifyConnectionCommand, openConnectionCommand, deleteConnectionCommand } from '../commands'
import { multiDeleteConnectionCommand } from '../commands/connection';



const Trigger = withContextMenuTrigger(contextMenuIds.CONNECTION_CONTEXTMENU_ID);

const ConnectionMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const { dispatch, connection, multiSelectItems } = props;
        switch (data.action) {
            case commandConstants.CONNECT_CONNECTION:
                openConnectionCommand({ dispatch, connectionId: connection });
                break;
            case commandConstants.REFRESH_CONNECTION:
                refreshConnectionCommand({ dispatch, connectionId: connection });
                break;
            case commandConstants.EDIT_CONNECTION:
                modifyConnectionCommand({ dispatch, ...props.data, oldName: connection });
                break;
            case commandConstants.DELETE_CONNECTION:
                if (multiSelectItems.length > 0) {
                    multiDeleteConnectionCommand({ dispatch, connectionNames: multiSelectItems });
                    return;
                }
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

const mapStateToProps = state => {
    return { ...state.state }
}

const trigger = connect(mapStateToProps)(ConnectionMenuTrigger);

export { trigger as ConnectionMenuTrigger }