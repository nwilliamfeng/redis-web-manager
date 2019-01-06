import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { withContextMenuTrigger } from './withMenuTrigger'
import { deleteKeyCommand, modifyKeyCommand } from '../commands'
import {keyActions} from '../../actions'
import {connect} from 'react-redux'



const Trigger = withContextMenuTrigger(contextMenuIds.KEY_CONTEXTMENU_ID);


  const KeyMenuTrigger = props => {
    const handleItemClick = (e, data, target) => {
        const { dispatch,  dbIdx, keyName, dbId,redisKey,connectionName } = props;
        switch (data.action) {
            case commandConstants.OPEN_KEY:
                 dispatch(keyActions.selectKey(redisKey));
               // modifyKeyCommand( { dispatch,  dbIdx, key:keyName, dbId,keyType,connectionName } )
                break;
            case commandConstants.DELETE_KEY:
                deleteKeyCommand({ dispatch, connectionName, dbIdx, keyName, dbId });
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
