import React, { Component } from 'react'
import { connect } from 'react-redux'
import { connectionActions,dbActions } from '../../actions'
import { ContextMenu, MenuItem ,connectMenu} from "react-contextmenu"

import { contextMenuIds,commandConstants } from '../../constants'



// const ConnectionContextMenu = props => {
//     const { dispatch ,loadedConnections} =props;
//     console.log();
//     const handleConnectClick = (e,data, target) => {
//         const connection=JSON.parse( target.getAttribute('connection'));
//         dispatch(dbActions.getDbList(connection.name));
//     }
//     return <ContextMenu id={contextMenuIds.CONNECTION_CONTEXTMENU_ID}>
//         <MenuItem  onClick={handleConnectClick}>连接</MenuItem> 
//     </ContextMenu>
// }

// const DBContextMenu = ({ dispatch }) => {
//     const handleOpenClick = (e, data, target) => {
//         alert('open db');
//     }
//     return <ContextMenu id={contextMenuIds.DB_CONTEXTMENU_ID}>
//         <MenuItem onClick={handleOpenClick}>打开</MenuItem>
//     </ContextMenu>
// }

// const KeyContextMenu = ({ dispatch }) => {
//     const handleOpenClick = (e, data, target) => {
//         alert('open key');
//     }
//     return <ContextMenu id={contextMenuIds.KEY_CONTEXTMENU_ID}>
//         <MenuItem onClick={handleOpenClick}>打开</MenuItem>
//     </ContextMenu>
// }

 
// class ContextMenus extends Component {

//     render() {
//         const {dispatch,loadedConnections}=this.props;
//         return <React.Fragment>
//             <ConnectionContextMenu {...this.props}/>
//             <DBContextMenu dispatch={dispatch} />
//             <KeyContextMenu dispatch={dispatch} />
//         </React.Fragment>
//     }
// }

// const mapStateToProps=state=>{
//     return {...state.connection,...state.db};
// }

// const cm= connect(mapStateToProps)(ContextMenus)

// export {cm as ContextMenus} 


const ConnectionMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;
  
    return  <ContextMenu id={id}>
            {trigger && <MenuItem onClick={handleItemClick} data={{ action: commandConstants.CONNECT_CONNECTION }}>{'连接'}</MenuItem>}
            {trigger && trigger.isRefreshEnable===true? <MenuItem onClick={handleItemClick} data={{ action: commandConstants.REFRESH_CONNECTION }}>{'刷新'}</MenuItem>
            : <MenuItem disabled>{'刷新'}</MenuItem>}
        </ContextMenu>
};


export const ConnectionContextMenu = connectMenu(contextMenuIds.CONNECTION_CONTEXTMENU_ID)(ConnectionMenu);


