import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { withContextMenuTrigger } from './withMenuTrigger'
import { deleteKeyCommand, multiDeleteKeyCommand } from '../commands'
import {keyActions} from '../../actions'
import {connect} from 'react-redux'



const Trigger = withContextMenuTrigger(contextMenuIds.KEY_CONTEXTMENU_ID);


  const KeyMenuTrigger = props => {
    const handleItemClick = (e, data, target) => {
        const { dispatch,  dbIdx, keyName, dbId,redisKey,connectionName,multiSelectItems,keys } = props;
        switch (data.action) {
            case commandConstants.OPEN_KEY:
                 dispatch(keyActions.selectKey(redisKey));
                break;
            case commandConstants.DELETE_KEY:
            if(multiSelectItems!=null && multiSelectItems.length>0){
                const keyNames = multiSelectItems.map(x => keys.find(a => a.id === x).key);
                multiDeleteKeyCommand({ dispatch, connectionName, dbIdx, keyNames, dbId: dbId });
            }
            else{
                deleteKeyCommand({ dispatch, connectionName, dbIdx, keyName, dbId });
            }
                break;

            default:
                break;
        }
    }
    const deleteDisable = () => {
        const { deleteDisable } = props;
        
        return deleteDisable;
    }

    return <Trigger {...props} onItemClick={handleItemClick} deleteDisable={deleteDisable}/>
} 

const mapStateToProps=state=>{
    return {...state.state}
}

const trigger=connect(mapStateToProps)(KeyMenuTrigger);

export {trigger as KeyMenuTrigger}
