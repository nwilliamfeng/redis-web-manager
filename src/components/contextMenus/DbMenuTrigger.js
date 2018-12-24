import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions, dialogAction } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'
import { Formik, Form } from 'formik';
import styled from 'styled-components'
import * as Yup from 'yup';
import { FormField } from '../../controls'



const validationSchema = Yup.object().shape({
    keyType: Yup.string().required('类型不能为空。'),
    keyId: Yup.string().required('键Id不能为空。'),
    keyValue: Yup.string().required('键值不能为空。'),
})



const PostForm = ({ redisKey,dispatch,dbIdx,dbId,connectionName }) => {
    return <Formik
        initialValues={redisKey}
        validationSchema={validationSchema}
   
        onSubmit={(values, actions) => {
            console.log(actions);
            dispatch(dbActions.addKey(connectionName,dbIdx, values.keyId,values.keyValue,values.keyType,dbId));
            //   MyImaginaryRestApiCall(user.id, values).then(
            //     updatedUser => {
            //       actions.setSubmitting(false);
            //       updateUser(updatedUser);
            //      // onClose();
            //     },
            //     error => {
            //       actions.setSubmitting(false);
            //       actions.setErrors(transformMyRestApiErrorsToAnObject(error));
            //       actions.setStatus({ msg: 'Set some arbitrary status or data' });
            //     }
            //   );
        }}
        render={({ errors, status, touched, isSubmitting,onReset }) => (
            <div style={{ padding: 10 }}>
                <Form>
                    <FormField component="select" fieldName="keyType" displyName="键类型">
                        <option value={1}>string</option>
                        <option value={2}>hashset</option>
                        <option value={3}>set</option>
                        <option value={4}>zset</option>
                        <option value={5}>list</option>
                    </FormField>
                    <FormField fieldName="keyId" displyName="键名称" errors={errors} />
                    <FormField fieldName="keyValue" displyName="键值内容" errors={errors} />

                    {status && status.msg && <div>{status.msg}</div>}
                    <button type="submit" className='btn btn-primary' disabled={isSubmitting} style={{marginTop:20, padding: '3px 10px' }}> 提交</button>
                    <button type="reset" className='btn btn-default'   style={{marginTop:20, marginLeft: 10, padding: '3px 10px' }}> 重置</button>
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
                const renderForm = () => {
                    return <PostForm redisKey={{ keyValue: null, keyId: null, keyType: 1 }} dbIdx={dbIdx} 
                    dbId={dbId} dispatch={dispatch} connectionName={connectionName}/>
                }
                dispatch(dialogAction.openForm('添加Key', renderForm, { width: 420 }));
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