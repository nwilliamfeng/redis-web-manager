import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { withContextMenuTrigger } from './withMenuTrigger'
import { deleteKeyCommand, modifyKeyCommand } from '../commands'



const Trigger = withContextMenuTrigger(contextMenuIds.KEY_CONTEXTMENU_ID);


export const KeyMenuTrigger = props => {
    const handleItemClick = (e, data, target) => {
        const { dispatch, connection, dbIdx, keyName, dbId } = props;
        switch (data.action) {
            case commandConstants.OPEN_KEY:
                //alert(`open:${connection},${dbIdx},${keyName}`);
                // dispatch(dbActions.getDbList(connection.name));
                modifyKeyCommand({ ...props })
                break;
            case commandConstants.DELETE_KEY:
                deleteKeyCommand({ dispatch, connection, dbIdx, keyName, dbId });
                break;

            default:
                break;
        }
    }


    return <Trigger {...props} onItemClick={handleItemClick} />
} 