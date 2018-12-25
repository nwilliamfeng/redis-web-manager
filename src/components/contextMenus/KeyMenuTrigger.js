import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions, dialogAction } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'




const Trigger = withContextMenuTrigger(contextMenuIds.KEY_CONTEXTMENU_ID);



export const KeyMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const { dispatch, connection, dbIdx, keyName, dbId } = props;
        switch (data.action) {
            case commandConstants.OPEN_KEY:
                alert(`open:${connection},${dbIdx},${keyName}`);
                // dispatch(dbActions.getDbList(connection.name));
                break;
            case commandConstants.DELETE_KEY:
                const renderDeleteKeyContent = () => {
                    return  <div style={{width:180,height:50}}>{`确定要删除 ${keyName} 键吗？`}</div>                   
                }
                dispatch(dialogAction.openConfirm('提醒', renderDeleteKeyContent, () => {
                    dispatch(dbActions.deleteKey(connection, dbIdx, keyName, dbId));
                }));

                break;

            default:
                break;
        }
    }


    return <Trigger {...props} onItemClick={handleItemClick} />
} 