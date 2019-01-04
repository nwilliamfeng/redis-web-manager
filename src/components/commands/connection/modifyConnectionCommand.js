import React from 'react'
import { dialogAction } from '../../../actions'
import { SettingConnectionPostForm } from './SettingConnectionPostForm'


/**
 * 修改连接命令
 * @param {{ dispatch,name,ip,port,password,oldName }} param0 
 */
export const modifyConnectionCommand = ({ dispatch,name,ip,port,password,oldName }) => {
     
    const  entity ={ name,ip,port,password } //默认值，否则执行yup时会警告
    const form = attachMessage => {
        return <SettingConnectionPostForm redisConnection={entity}  attachMessage={attachMessage} dispatch={dispatch} oldConnectionName={oldName} />
    }
    dispatch(dialogAction.openForm('修改Redis连接', form, { width: 420 }));
}

