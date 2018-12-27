import React, { Component } from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions, dialogAction } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'
import { Formik, Form } from 'formik';
import styled from 'styled-components'
import * as Yup from 'yup';
import { FormField } from '../../controls'


/**
 * 验证魔板
 */
const validationSchema = Yup.object().shape({
    keyType: Yup.string().required('类型不能为空。'),
    keyId: Yup.string().required('键Id不能为空。'),
    keyName:Yup.string().required('键Name不能为空。'),
    keyValue: Yup.string().required('键值不能为空。'),
})

const PostForm = ({ redisKey, dispatch, dbIdx, dbId, connectionName, attachMessage }) => {
    return <Formik
        initialValues={redisKey}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            dispatch(dbActions.addKey(connectionName, dbIdx, values.keyId, values.keyValue, values.keyType, dbId));
        }}
        render={({ values, errors, status, touched, isSubmitting }) => (<div style={{ padding: 10 }}>
            <Form>
                <FormField component="select" fieldName="keyType" displyName="键类型">
                    <option value={1}>string</option>
                    <option value={2}>hashset</option>
                    <option value={3}>set</option>
                    <option value={4}>zset</option>
                    <option value={5}>list</option>
                </FormField>
                <FormField fieldName="keyId" displyName="Id" errors={errors} />
                {(Number.parseInt(values.keyType) === 2 || Number.parseInt(values.keyType) === 4) && <FormField fieldName="keyName" displyName={Number.parseInt(values.keyType) === 2 ? 'Key' : 'Score'} errors={errors} />}
                <FormField fieldName="keyValue" displyName="Value" errors={errors} />
                {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>}
                <button type="submit" className='btn btn-primary' disabled={isSubmitting && attachMessage == null} style={{ marginTop: 20, padding: '3px 10px' }}> 提交</button>
                <button type="reset" className='btn btn-default' style={{ marginTop: 20, marginLeft: 10, padding: '3px 10px' }}> 重置</button>
            </Form>
        </div>
        )}
    />
}


const Trigger = withContextMenuTrigger(contextMenuIds.DB_CONTEXTMENU_ID);

export const DbMenuTrigger = props => {

    const handleItemClick = (e, data, target) => {
        const { dispatch, dbIdx, connectionName, dbId } = props;
        switch (data.action) {
            case commandConstants.LOAD_KEYS:
                dispatch(dbActions.getKeyList(connectionName, dbIdx, dbId));
                break;
            case commandConstants.ADD_KEY:
                const renderAddForm = attachMessage => {
                    return <PostForm redisKey={{ keyValue: '', keyId: '', keyType: 1 }} dbIdx={dbIdx}
                        dbId={dbId} dispatch={dispatch} connectionName={connectionName} attachMessage={attachMessage} />
                }
                dispatch(dialogAction.openForm('添加Key', renderAddForm, { width: 420 }));
                break;
            default:
                break;
        }
    }
    const isRefreshEnable = () => {
        const { isKeyLoaded } = props;
        return isKeyLoaded;
    }

    return <Trigger {...props} isRefreshEnable={isRefreshEnable()} onItemClick={handleItemClick} />
} 