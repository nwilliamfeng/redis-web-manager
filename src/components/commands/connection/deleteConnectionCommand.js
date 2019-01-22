import React from 'react'
import { connectionActions, dialogAction } from '../../../actions'
import { ConfirmButton } from '../../controlParts'



const DeleteConnectionConfirm = props => {
    const { dispatch, connectionId } = props;
    return <React.Fragment>
        <div style={{ height: 70 }}><span>{'确定要删除 '}<span style={{ fontWeight: 'bold' }}>{connectionId}</span>{' 这个连接吗?'}</span></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(connectionActions.deleteConnection(connectionId))} />
        </div>

    </React.Fragment>
}


export const deleteConnectionCommand = ({ dispatch, connectionId }) => {
    dispatch(dialogAction.openConfirm('提醒', () => <DeleteConnectionConfirm {...{ dispatch, connectionId }} />));
}


const MultiDeleteConnectionConfirm = props => {
    const { dispatch, connectionNames } = props;
    return <React.Fragment>
        <div style={{ width: 180, height: 70 }}>{`确定要删除这 ${connectionNames.length} 个连接吗？`}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(connectionActions.deleteConnections(connectionNames))} />
        </div>

    </React.Fragment>
}

/**
 * 批删除
 * @param {*} param0 
 */
export const multiDeleteConnectionCommand = ({ dispatch, connectionNames  }) => {

    dispatch(dialogAction.openConfirm('提醒', () => <MultiDeleteConnectionConfirm {...{ dispatch, connectionNames }} />));
}