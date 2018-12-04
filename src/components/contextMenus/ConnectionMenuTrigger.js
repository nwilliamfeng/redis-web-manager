import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions } from '../../actions'
import { ContextMenuTrigger } from "react-contextmenu"
import { withContextMenuTrigger } from './withMenuTrigger'



export const ConnectionMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const {dispatch}=props;
        const connection = JSON.parse(target.getAttribute('connection')).name;
        switch (data.action) {
            case commandConstants.CONNECT_CONNECTION:
                dispatch(dbActions.getDbList(connection));
                break;
            default:
                break;
        }
    }
    const isRefreshEnable=()=>{
        console.log(props);
        return true;
    }
    const data = { id: contextMenuIds.CONNECTION_CONTEXTMENU_ID, attributes: { connection: JSON.stringify(props.item) }, handleItemClick }
    const Trigger = withContextMenuTrigger(data);
    return <Trigger {...props} isRefreshEnable={isRefreshEnable()}/>
} 