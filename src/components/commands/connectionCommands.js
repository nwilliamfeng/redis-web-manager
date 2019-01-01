import React from 'react'
import { connectionActions ,dialogAction} from '../../actions'
import { ConfirmButton, ResetButton, SubmitButton } from '../controlParts'

/**
 * 刷新Connection命令
 * @param {*} param0 
 */
export const refreshConnectionCommand=({ dispatch, connectionId } )=>{
    dispatch(connectionActions.refreshDbList(connectionId));
}

export const openConnectionCommand=({ dispatch, connectionId } )=>{
    dispatch(connectionActions.getDbList(connectionId));
}


const DeleteConnectionConfirm = props => {
    const { dispatch, connectionId} = props;
    return <React.Fragment>
        <div style={{ width: 180, height: 70 }}>{`确定要删除 ${connectionId} 连接吗？`}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(connectionActions.deleteConnection(connectionId))} />
        </div>

    </React.Fragment>
}


export const deleteConnectionCommand=({ dispatch, connectionId } )=>{
    dispatch(dialogAction.openConfirm('提醒', () => <DeleteConnectionConfirm {...{ dispatch, connectionId }} />));
    
}