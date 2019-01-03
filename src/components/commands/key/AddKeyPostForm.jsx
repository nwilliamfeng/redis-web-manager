import React from 'react'
import { dbActions } from '../../../actions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../../../controls'
import { ResetButton, SubmitButton } from '../../controlParts'


/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({
    type: Yup.string().required('类型不能为空。'),
    id: Yup.string().required('Id不能为空。'),
    key: Yup.string().when(['type'], {
        is: kt => Number.parseInt(kt) === 2 || Number.parseInt(kt) === 4,
        then: Yup.string().required('key不能为空。')
    }),
    value: Yup.string().required('value不能为空。'),
})


/**
 * 提交key的form
 * @param {*} param0 
 */
export const AddKeyPostForm = ({ redisKey, dispatch, dbIdx, dbId, connectionName, attachMessage }) => {
    return <Formik
        initialValues={redisKey}
        validationSchema={validationSchema}
        onSubmit={values => {
            dispatch(dbActions.addKey(connectionName, dbIdx, dbId, values.type, values.id, values.key, values.value));
        }}
        render={({ values, errors, isSubmitting }) => (<div style={{ padding: 10 }}>
            <Form>
                <FormField component="select" fieldName="type" displyName="键类型">
                    <option value={1}>string</option>
                    <option value={2}>hash</option>
                    <option value={3}>set</option>
                    <option value={4}>zset</option>
                    <option value={5}>list</option>
                </FormField>
                <FormField fieldName="id" displyName="Id" errors={errors} />
                {(Number.parseInt(values.type) === 2 || Number.parseInt(values.type) === 4) && <FormField fieldName="key" displyName={Number.parseInt(values.type) === 2 ? 'Key' : 'Score'} errors={errors} />}
                <FormField fieldName="value" displyName="Value" errors={errors} />
                {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>}
                <SubmitButton disabled={isSubmitting && attachMessage == null} />
                <ResetButton disabled={isSubmitting && attachMessage == null} />
            </Form>
        </div>
        )}
    />
}



