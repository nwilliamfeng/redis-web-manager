import React from 'react'
import { connectionActions } from '../../../actions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../../../controls'
import { ResetButton, SubmitButton } from '../../controlParts'
import {regexUtil} from '../../../utils'

/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({
    name: Yup.string().required('名称不能为空。').max(15,'名称最大长度不能超过15个字符').min(2,'名称最小长度不能少于2个字符'),
    ip: Yup.string().required('ip不能为空。').matches(new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/),'不正确的Ip'),
    port: Yup.number().min(1025,'错误的端口号').max(65534,'错误的端口号'),

})


/**
 * 提交key的form
 * @param {*} param0 
 */
export const SettingConnectionPostForm = ({ redisConnection, dispatch, attachMessage,oldConnectionName }) => {
    return <Formik
        initialValues={redisConnection}
        validationSchema={validationSchema}
        onSubmit={values => {
            if(oldConnectionName==null){ //如果未指定oldConnectionName则认为是新建的
                dispatch(connectionActions.addConnection(values.name, values.ip, values.port, values.password));
            }
            else{
                dispatch(connectionActions.modifyConnection(values.name, values.ip, values.port, values.password,oldConnectionName));
            }
            
        }}
        render={({ values, errors, isSubmitting }) => (<div style={{ padding: 10 }}>
            <Form>
                <FormField fieldName="name" displyName="名称" errors={errors} />
                <FormField fieldName="ip" displyName="IP" errors={errors} />
                <FormField fieldName="port" displyName="Port" errors={errors} />
                <FormField fieldName="password" displyName="密码"  />
                {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>}
                <SubmitButton disabled={isSubmitting && attachMessage == null} />
                <ResetButton disabled={isSubmitting && attachMessage == null} />
            </Form>
        </div>
        )}
    />
}



