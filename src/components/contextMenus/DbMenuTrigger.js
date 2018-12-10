import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { keyActions,dbActions } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'




const Trigger = withContextMenuTrigger(contextMenuIds.DB_CONTEXTMENU_ID);

export const DbMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        console.log(props);
        const {dispatch, dbIdx, connectionName ,dbId} = props;
        switch (data.action) {
            case commandConstants.LOAD_KEYS:
                dispatch(dbActions.getKeyList(connectionName,dbIdx,dbId));
                
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