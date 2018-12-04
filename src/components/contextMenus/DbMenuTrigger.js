import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { keyActions } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'




const Trigger = withContextMenuTrigger(contextMenuIds.DB_CONTEXTMENU_ID);

export const DbMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const {dispatch, dbIdx, connectionName } = props;
        switch (data.action) {
            case commandConstants.LOAD_KEYS:
                dispatch(keyActions.getKeyList(connectionName,dbIdx));
                break;
            case commandConstants.REFRESH_CONNECTION:
            alert('refresh db');
               // dispatch(dbActions.getDbList(connection.name));
                break;
            default:
                break;
        }
    }
    const isRefreshEnable = () => {
        const { isKeyLoaded } = props;
        return isKeyLoaded;
    }

    return <Trigger {...props} isRefreshEnable={isRefreshEnable()} onItemClick={handleItemClick} />
} 