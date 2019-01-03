import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { withContextMenuTrigger } from './withMenuTrigger'
import { deleteKeyCommand, modifyKeyCommand } from '../commands'



const Trigger = withContextMenuTrigger(contextMenuIds.KEY_CONTEXTMENU_ID);


export const KeyMenuTrigger = props => {
    const handleItemClick = (e, data, target) => {
        const { dispatch,  dbIdx, keyName, dbId,keyType,connectionName } = props;
        switch (data.action) {
            case commandConstants.OPEN_KEY:

                modifyKeyCommand( { dispatch,  dbIdx, key:keyName, dbId,keyType,connectionName } )
                break;
            case commandConstants.DELETE_KEY:
                deleteKeyCommand({ dispatch, connectionName, dbIdx, keyName, dbId });
                break;

            default:
                break;
        }
    }


    return <Trigger {...props} onItemClick={handleItemClick} />
} 