import React from 'react'
import { dialogAction, keyActions } from '../../../actions'
import { commandHelper } from '../commandHelper'
import {redisApi} from '../../../api'
import { ModifyStringKeyPostForm } from './ModifyStringKeyPostForm'
import { nodeTypes } from '../../../constants';

 
/**
 * 修改键命令
 * @param {{redisKey, dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const modifyKeyCommand = props => {
    return {
        canExecute: () => {
            const { selectedKeyId,multiSelectItems,selectedNodeType } = props;
            return (selectedNodeType===nodeTypes.DB && multiSelectItems.length===1) || selectedKeyId != null  ;
        },

        execute: async() => {
     
            const sk =commandHelper.getSelectedKey(props);
            const {dbIdx,dbId,connectionName,key,type}=sk;
            const { dispatch } = props;
            const value =await redisApi.getStringKeyValue(connectionName,dbIdx,key);
            const redisKey={value, id: key, type, }
      
            const form = attachMessage => {
                return <ModifyStringKeyPostForm redisKey={redisKey} dbIdx={dbIdx} dbId={dbId} 
                dispatch={dispatch} connectionName={connectionName} attachMessage={attachMessage} isModify={true}/>
            }
            dispatch(dialogAction.openForm('修改Key', form, { width: 420 }));
        },
    }
}

