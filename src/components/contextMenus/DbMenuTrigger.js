import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { withContextMenuTrigger } from './withMenuTrigger'
import { addKeyCommand, refreshDbCommand } from '../commands'

const Trigger = withContextMenuTrigger(contextMenuIds.DB_CONTEXTMENU_ID);

export const DbMenuTrigger = props => {
    const handleItemClick = (e, data, target) => {
        switch (data.action) {
            case commandConstants.LOAD_KEYS:
                refreshDbCommand({ ...props });
                break;
            case commandConstants.ADD_KEY:
                addKeyCommand({ ...props });
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