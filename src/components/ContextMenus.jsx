import React from 'react'
import { connect } from 'react-redux'
import { connectionActions } from '../actions'
import { ContextMenu, MenuItem } from "react-contextmenu"
import { Connection } from './Connection'
import { contextMenuIds } from '../constants'



const ConnectionContextMenu = ({ dispatch }) => {
    const handleConnectClick = (e, data, target) => {
        alert('abc');
    }
    return <ContextMenu id={contextMenuIds.CONNECTION_CONTEXTMENU_ID}>
        <MenuItem onClick={handleConnectClick}>连接</MenuItem>
    </ContextMenu>
}

const DBContextMenu = ({ dispatch }) => {
    const handleOpenClick = (e, data, target) => {
        alert('open db');
    }
    return <ContextMenu id={contextMenuIds.DB_CONTEXTMENU_ID}>
        <MenuItem onClick={handleOpenClick}>打开</MenuItem>
    </ContextMenu>
}

export const ContextMenus =( {dispatch}) => {
    return <React.Fragment>
        <ConnectionContextMenu dispatch={dispatch} />
        <DBContextMenu dispatch={dispatch} />
    </React.Fragment>

}



