import React from 'react'
import { commandConstants, contextMenuIds, nodeTypes } from '../../constants'
import { withContextMenuTrigger } from './withMenuTrigger'
import { addKeyCommand, refreshDbCommand, compositOpenCommand } from '../commands'
import {connect} from 'react-redux'

const Trigger = withContextMenuTrigger(contextMenuIds.DB_CONTEXTMENU_ID);

 const DbMenuTrigger = props => {
    const handleItemClick = (e, data, target) => {
        switch (data.action) {
            case commandConstants.LOAD_KEYS:
            const {  multiSelectItems,selectedNodeType } = props;
                if(selectedNodeType===nodeTypes.CONNECTION && multiSelectItems.length>0){
                    compositOpenCommand(props).execute();
                    return;
                }
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

const mapStateToProps = state => {
    const {dbs} =state.db;
    return { ...state.state,dbs }????
}

const trigger = connect(mapStateToProps)(DbMenuTrigger);

export { trigger as DbMenuTrigger }