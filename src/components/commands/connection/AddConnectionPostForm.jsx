import React from 'react'
import { connectionActions } from '../../../actions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../../../controls'
import { ResetButton, SubmitButton } from '../../controlParts'


/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({
    name: Yup.string().required('名称不能为空。'),
    ip: Yup.string().required('ip不能为空。'),
    port: Yup.string().required('port不能为空。'),

})


/**
 * 提交key的form
 * @param {*} param0 
 */
export const AddConnectionPostForm = ({ redisConnection, dispatch, attachMessage }) => {
    return <Formik
        initialValues={redisConnection}
        validationSchema={validationSchema}
        onSubmit={values => {
            dispatch(connectionActions.addConnection(values.name, values.ip, values.port, values.password));
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



