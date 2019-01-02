import React from 'react'
import { dialogAction } from '../../../actions'
import { AddKeyPostForm } from './AddKeyPostForm'


/**
 * 添加键命令
 * @param {{ dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const addKeyCommand = ({ dispatch, dbIdx, connectionName, dbId }) => {
     
    const defaultKey = { value: '', id: '', type: 1, key: '' } //默认值，否则执行yup时会警告
    const form = attachMessage => {
        return <AddKeyPostForm redisKey={defaultKey} dbIdx={dbIdx} dbId={dbId} dispatch={dispatch} connectionName={connectionName} attachMessage={attachMessage} />
    }
    dispatch(dialogAction.openForm('添加Key', form, { width: 420 }));
}

