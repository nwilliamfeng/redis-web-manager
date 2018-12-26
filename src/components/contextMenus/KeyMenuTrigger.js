import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions, dialogAction } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'
import { ConfirmButton } from '../controlParts'




const Trigger = withContextMenuTrigger(contextMenuIds.KEY_CONTEXTMENU_ID);

const DeleteKeyConfirm = props => {
    const { dispatch, connection, dbIdx, keyName, dbId } = props;
    return <React.Fragment>
        <div style={{ width: 180, height: 70 }}>{`确定要删除 ${keyName} 键吗？`}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(dbActions.deleteKey(connection, dbIdx, keyName, dbId))} />
        </div>

    </React.Fragment>
}

export const KeyMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const { dispatch, connection, dbIdx, keyName, dbId } = props;
        switch (data.action) {
            case commandConstants.OPEN_KEY:
                alert(`open:${connection},${dbIdx},${keyName}`);
                // dispatch(dbActions.getDbList(connection.name));
                break;
            case commandConstants.DELETE_KEY:
                dispatch(dialogAction.openConfirm('提醒', ()=><DeleteKeyConfirm {...props}/>));
                break;

            default:
                break;
        }
    }


    return <Trigger {...props} onItemClick={handleItemClick} />
} 