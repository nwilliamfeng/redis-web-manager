import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions, dialogAction } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'
import { Formik, Form, Field, withFormik } from 'formik';
import { TextInput, Select } from '../../controls'
import styled from 'styled-components'
import * as Yup from 'yup';



const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        keyType: Yup.string().required('类型不能为空。'),
        keyId: Yup.string().required('键Id不能为空。'),
        keyValue: Yup.string().required('键值不能为空。'),
    }),

    mapPropsToValues: ({ key }) => ({
        ...key,
    }),
    handleSubmit: (payload, { setSubmitting }) => {
        console.log(payload);
        // alert(payload.email);
        setSubmitting(false);
    },
});



const MyForm = props => {
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props;
    return <div style={{ padding: 10 }}>
        <form onSubmit={handleSubmit} className={'form-horizontal'}>
            <Select
                id="keyType"
                type="text"
                label="类型"
                placeholder="请输入类型"
                error={touched.keyType && errors.keyType}
                value={values.keyType}
                onChange={handleChange}
                onBlur={handleBlur}

            />
            <TextInput
                id="keyId"
                type="text"
                label="键Id"
                placeholder="请输入键的Id"
                error={touched.keyId && errors.keyId}
                value={values.keyId}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextInput
                id="keyValue"
                type="text"
                label="键值"
                placeholder="请输入键值"
                error={touched.keyValue && errors.keyValue}
                value={values.keyValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <button type="submit" className={'btn btn-primary'} disabled={isSubmitting}>{'确定'}</button>
            <button type="button" style={{ marginLeft: 10 }} className={'btn btn-default'} onClick={handleReset} disabled={!dirty || isSubmitting}>
                {'重置'}
            </button>

        </form>
    </div>

};

const MyEnhancedForm = formikEnhancer(MyForm);


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
                    return <MyEnhancedForm />
                }
                dispatch(dialogAction.openForm('添加Key', renderForm));
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