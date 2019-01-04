import React from 'react'
import { ContextMenu, MenuItem, connectMenu } from "react-contextmenu"
import { contextMenuIds, commandConstants, nodeTypes } from '../../constants'


const ConnectionMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;
    return <ContextMenu id={id}>
        {trigger && trigger.isRefreshEnable === false &&
            <MenuItem onClick={handleItemClick} data={{ action: commandConstants.CONNECT_CONNECTION }}>{'连接'}</MenuItem>}
        {trigger && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.EDIT_CONNECTION }}>{'编辑'}</MenuItem>}
        {trigger && trigger.isRefreshEnable === true
            && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.REFRESH_CONNECTION }}>{'刷新'}</MenuItem>}
        {trigger && <MenuItem divider={true} />}
        <MenuItem onClick={handleItemClick} data={{ action: commandConstants.DELETE_CONNECTION }}>{'删除'}</MenuItem>
    </ContextMenu>
}

/**
 * 连接的快捷菜单项
 */
export const ConnectionContextMenu = connectMenu(contextMenuIds.CONNECTION_CONTEXTMENU_ID)(ConnectionMenu);

const DbMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;

    return <ContextMenu id={id}>
        {trigger && trigger.isRefreshEnable === false &&
            <MenuItem onClick={handleItemClick} data={{ action: commandConstants.LOAD_KEYS }}>{'加载键'}</MenuItem>}
        {trigger && trigger.isRefreshEnable === true
            && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.LOAD_KEYS }}>{'刷新'}</MenuItem>}
        {trigger && <MenuItem divider={true} />}
        <MenuItem disabled={trigger && trigger.isRefreshEnable === false} onClick={handleItemClick} data={{ action: commandConstants.ADD_KEY }}>{'添加键'}</MenuItem>
    </ContextMenu>
}

/**
 * DB的快捷菜单项
 */
export const DbContextMenu = connectMenu(contextMenuIds.DB_CONTEXTMENU_ID)(DbMenu);

const KeyMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;
    let openDisable = false;
    if (trigger != null) {
        const { selectedNodeType, multiSelectItems } = trigger;
        openDisable = selectedNodeType === nodeTypes.DB && multiSelectItems.length > 1;
    }
    return <ContextMenu id={id}>
        {trigger && <MenuItem disabled={openDisable === true} onClick={handleItemClick} data={{ action: commandConstants.OPEN_KEY }}>{'打开'}</MenuItem>}
        {trigger && <MenuItem divider={true} />}
        <MenuItem onClick={handleItemClick} data={{ action: commandConstants.DELETE_KEY }}>{'删除'}</MenuItem>
    </ContextMenu>
}

/**
 * rediskey的快捷菜单项
 */
export const KeyContenxtMenu = connectMenu(contextMenuIds.KEY_CONTEXTMENU_ID)(KeyMenu);