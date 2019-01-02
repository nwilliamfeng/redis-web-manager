import React from 'react'
import {keyActions, dbActions, dialogAction } from '../../actions'
import { ConfirmButton, ResetButton, SubmitButton } from '../controlParts'


const DeleteKeyConfirm = props => {
    const { dispatch, connection, dbIdx, keyName, dbId } = props;
    return <React.Fragment>
        <div style={{ width: 180, height: 70 }}>{`确定要删除 ${keyName} 键吗？`}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(keyActions.deleteKey(connection, dbIdx, keyName, dbId))} />
        </div>

    </React.Fragment>
}

/**
 * 
 * @param {*} param0 
 */
export const deleteKeyCommand = ({ dispatch, connection, dbIdx, keyName, dbId }) => {
    dispatch(dialogAction.openConfirm('提醒', () => <DeleteKeyConfirm {...{ dispatch, connection, dbIdx, keyName, dbId }} />));
}


const MultiDeleteKeyConfirm = props => {
    const { dispatch, connection, dbIdx, keyNames, dbId } = props;
    return <React.Fragment>
        <div style={{ width: 180, height: 70 }}>{`确定要删除这 ${keyNames.length} 项吗？`}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ConfirmButton onConfirm={() => dispatch(keyActions.deleteKeys(connection, dbIdx, keyNames, dbId))} />
        </div>

    </React.Fragment>
}

/**
 * 批删除
 * @param {*} param0 
 */
export const multiDeleteKeyCommand = ({ dispatch, connection, dbIdx, keyNames, dbId }) => {

    dispatch(dialogAction.openConfirm('提醒', () => <MultiDeleteKeyConfirm {...{ dispatch, connection, dbIdx, keyNames, dbId }} />));
}