import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'




const Trigger = withContextMenuTrigger(contextMenuIds.KEY_CONTEXTMENU_ID);

export const KeyMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const { dispatch, connection,dbIdx,keyName } = props;
        switch (data.action) {
            case commandConstants.OPEN_KEY:
            alert('open');
               // dispatch(dbActions.getDbList(connection.name));
                break;
            case commandConstants.DELETE_KEY:
                alert('delete');
                // dispatch(dbActions.getDbList(connection.name));
                break;
            default:
                break;
        }
    }
    

    return <Trigger {...props}  onItemClick={handleItemClick} />
} 