import React from 'react'
import { ContextMenu, MenuItem, connectMenu } from "react-contextmenu"
import { contextMenuIds, commandConstants } from '../../constants'


const ConnectionMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;
    return <ContextMenu id={id}>
        {trigger && trigger.isRefreshEnable === false &&
            <MenuItem onClick={handleItemClick} data={{ action: commandConstants.CONNECT_CONNECTION }}>{'连接'}</MenuItem>}
        {trigger && trigger.isRefreshEnable === true
            && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.REFRESH_CONNECTION }}>{'刷新'}</MenuItem>}
    </ContextMenu>
}

export const ConnectionContextMenu = connectMenu(contextMenuIds.CONNECTION_CONTEXTMENU_ID)(ConnectionMenu);

const DbMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;

    return <ContextMenu id={id}>
        {trigger && trigger.isRefreshEnable === false &&
            <MenuItem onClick={handleItemClick} data={{ action: commandConstants.LOAD_KEYS }}>{'加载键'}</MenuItem>}
        {trigger && trigger.isRefreshEnable === true
            && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.LOAD_KEYS }}>{'刷新'}</MenuItem>}
    </ContextMenu>
}

export const DbContextMenu = connectMenu(contextMenuIds.DB_CONTEXTMENU_ID)(DbMenu);

const KeyMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;

    return <ContextMenu id={id}>
        {trigger && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.OPEN_KEY }}>{'打开'}</MenuItem>}
        {trigger && <MenuItem divider={true}/>}
        {trigger && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.DELETE_KEY }}>{'删除'}</MenuItem>}
    </ContextMenu>
}

export const KeyContenxtMenu = connectMenu(contextMenuIds.KEY_CONTEXTMENU_ID)(KeyMenu);