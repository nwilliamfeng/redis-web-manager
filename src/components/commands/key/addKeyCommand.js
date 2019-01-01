import React from 'react'
import { dialogAction } from '../../../actions'
import {dbStates} from '../../../constants'
import {commandHelper} from '../commandHelper'
import { AddKeyPostForm } from './AddKeyPostForm'


/**
 * 添加键命令
 * @param {{ dispatch, dbIdx, connectionName, dbId }} param0 
 */
export const addKeyCommand = props => {
    return {
        canExecute: () => {
             const { selectedDbId } =  props;
        if (selectedDbId == null) {
            return false;
        }
        const db = commandHelper.getSelectedDb(props);
        return db == null ? false : db.dbState === dbStates.KEY_LOAD_SUCCESS;
        },

        execute: () => {
           
            const db =commandHelper.getSelectedDb(props);
            const { dispatch } =props;
            const {  dbIdx, connectionName, id } = db;
            const defaultKey = { value: '', id: '', type: 1, key: '' } //默认值，否则执行yup时会警告
            const form = attachMessage => {
                return <AddKeyPostForm redisKey={defaultKey} dbIdx={dbIdx} dbId={id} dispatch={dispatch} connectionName={connectionName} attachMessage={attachMessage} />
            }
            dispatch(dialogAction.openForm('添加Key', form, { width: 420 }));
        },
    }
}

