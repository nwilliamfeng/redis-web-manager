import React from 'react'
import { dialogAction } from '../../../actions'
import { AddConnectionPostForm } from './AddConnectionPostForm'


/**
 * 添加键命令
 * @param {dispatch} param0 
 */
export const addConnectionCommand = ({ dispatch }) => {
     
    const defaultValue = { name:'', ip:'127.0.0.1', port:'6379',password:'' } //默认值，否则执行yup时会警告
    const form = attachMessage => {
        return <AddConnectionPostForm redisConnection={defaultValue}  attachMessage={attachMessage} dispatch={dispatch} />
    }
    dispatch(dialogAction.openForm('添加Redis连接', form, { width: 420 }));
}

