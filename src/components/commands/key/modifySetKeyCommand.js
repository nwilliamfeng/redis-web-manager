import React from 'react'
import { dialogAction } from '../../../actions'
import { redisApi } from '../../../api'
import { ModifyStringKeyPostForm } from './ModifyStringKeyPostForm'
 
/**
 * 修改键命令
 * @param {{key,keyType, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const modifySetKeyCommand = async ({ dispatch, key,keyType, dbIdx, dbId, connectionName }) => {
    const value = await redisApi.getStringKeyValue(connectionName, dbIdx, key);
    const redisKey = { value, id: key, type:keyType, }

    const form = attachMessage => {
        return <ModifyStringKeyPostForm redisKey={redisKey} dbIdx={dbIdx} dbId={dbId}
            dispatch={dispatch} connectionName={connectionName} attachMessage={attachMessage} />
    }
    dispatch(dialogAction.openForm('修改Key', form, { width: 420 }));
}

