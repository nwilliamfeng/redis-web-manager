import React from 'react'
import {keyActions, dialogAction } from '../../../actions'
import { ConfirmButton } from '../../controlParts'


const DeleteKeyConfirm = props => {
    const { dispatch, connectionName, dbIdx, keyName, dbId } = props;
    return <React.Fragment>
        <div style={{ width: 180, height: 70 }}>{`确定要删除 ${keyName} 键吗？`}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(keyActions.deleteKey(connectionName, dbIdx, keyName, dbId))} />
        </div>

    </React.Fragment>
}

/**
 * 
 * @param {*} param0 
 */
export const deleteKeyCommand = ({ dispatch, connectionName, dbIdx, keyName, dbId }) => {
    dispatch(dialogAction.openConfirm('提醒', () => <DeleteKeyConfirm {...{ dispatch, connectionName, dbIdx, keyName, dbId }} />));
}


const MultiDeleteKeyConfirm = props => {
    const { dispatch, connectionName, dbIdx, keyNames, dbId } = props;
    return <React.Fragment>
        <div style={{ width: 180, height: 70 }}>{`确定要删除这 ${keyNames.length} 项吗？`}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(keyActions.deleteKeys(connectionName, dbIdx, keyNames, dbId))} />
        </div>

    </React.Fragment>
}

/**
 * 批删除
 * @param {*} param0 
 */
export const multiDeleteKeyCommand = ({ dispatch, connectionName, dbIdx, keyNames, dbId }) => {

    dispatch(dialogAction.openConfirm('提醒', () => <MultiDeleteKeyConfirm {...{ dispatch, connectionName, dbIdx, keyNames, dbId }} />));
}