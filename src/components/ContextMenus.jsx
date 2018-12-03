import React, { Component } from 'react'
import { connect } from 'react-redux'
import { connectionActions,dbActions } from '../actions'
import { ContextMenu, MenuItem } from "react-contextmenu"

import { contextMenuIds } from '../constants'



const ConnectionContextMenu = props => {
    const { dispatch ,loadedConnections} =props;
    console.log();
    const handleConnectClick = (e,data, target) => {
        const connection=JSON.parse( target.getAttribute('connection'));
        dispatch(dbActions.getDbList(connection.name));
    }
    return <ContextMenu id={contextMenuIds.CONNECTION_CONTEXTMENU_ID}>
        <MenuItem  onClick={handleConnectClick}>连接</MenuItem> 
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

const KeyContextMenu = ({ dispatch }) => {
    const handleOpenClick = (e, data, target) => {
        alert('open key');
    }
    return <ContextMenu id={contextMenuIds.KEY_CONTEXTMENU_ID}>
        <MenuItem onClick={handleOpenClick}>打开</MenuItem>
    </ContextMenu>
}

// export const ContextMenus =( {dispatch}) => {
//     return <React.Fragment>
//         <ConnectionContextMenu dispatch={dispatch} />
//         <DBContextMenu dispatch={dispatch} />
//         <KeyContextMenu dispatch={dispatch} />
//     </React.Fragment>

// }

class ContextMenus extends Component {

    render() {
        const {dispatch,loadedConnections}=this.props;
        return <React.Fragment>
            <ConnectionContextMenu {...this.props}/>
            <DBContextMenu dispatch={dispatch} />
            <KeyContextMenu dispatch={dispatch} />
        </React.Fragment>
    }
}

const mapStateToProps=state=>{
    return {...state.connection,...state.db};
}

const cm= connect(mapStateToProps)(ContextMenus)

export {cm as ContextMenus} 



