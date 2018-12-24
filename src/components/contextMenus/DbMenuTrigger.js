import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions, dialogAction } from '../../actions'
import { withContextMenuTrigger } from './withMenuTrigger'
import { Formik, Form, Field, withFormik, ErrorMessage } from 'formik';
import { TextInput, Select } from '../../controls'
import styled from 'styled-components'
import * as Yup from 'yup';

const FlexDiv = styled.div`
    display:flex;
`

const validationSchema = Yup.object().shape({
    keyType: Yup.string().required('类型不能为空。'),
    keyId: Yup.string().required('键Id不能为空。'),
    keyValue: Yup.string().required('键值不能为空。'),
})



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
                placeholder="请输入键的值内容"
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

const BootstrapField = props => {
    const { component, fieldName, isError } = props;
    const style = { borderRadius: 1, height: 24, width: '100%', padding: '1px 5px', fontSize: 13 };
    const errorStyle = {
        borderColor: 'red',
        boxShadow: '0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6)',
        outline: '0 none',
        ...style,
    }
    return <Field component={component} type="text" name={fieldName} className='form-control' style={isError === true ? errorStyle : style}>
        {props.children}
    </Field>
}



const NewForm = ({ redisKey }) => {
    return <Formik
        initialValues={redisKey}
        validationSchema={validationSchema}

        onSubmit={(values, actions) => {
            console.log(values);
            alert(values);
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
        render={({ errors, status, touched, isSubmitting }) => (
            <Form>
                <FlexDiv>
                    <label>类型</label>
                    <div>

                        <BootstrapField component="select" fieldName="keyType" >
                            <option value={1}>string</option>
                            <option value={2}>hashset</option>
                            <option value={3}>set</option>
                            <option value={4}>zset</option>
                            <option value={5}>list</option>
                        </BootstrapField>
                        <ErrorMessage name="keyType" component="div" className="error" />
                    </div>
                </FlexDiv>
                <FlexDiv>
                    <label>名称</label>
                    <div>
                        <BootstrapField fieldName="keyId" isError={errors.keyId != null} />
                        <ErrorMessage name="keyId" style={{color:'red'}}>
                            {errorMessage => <div className="error">{errorMessage}</div>}
                        </ErrorMessage>
                    </div>

                </FlexDiv>
                <FlexDiv>
                    <label>值</label>
                    <div>
                        <BootstrapField fieldName="keyValue" isError={errors.keyValue != null} />
                        <ErrorMessage name="keyValue" className="error" component="div" style={{color:'red'}}/>
                    </div>
                </FlexDiv>

                {status && status.msg && <div>{status.msg}</div>}
                <button type="submit" className='btn btn-primary' disabled={isSubmitting}> 提交</button>
                <button type="submit" className='btn btn-default' style={{marginLeft:10,padding:}}> 重置</button>
            </Form>
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
                    return <NewForm redisKey={{ keyValue: 'newValue', keyId: '1001', keyType: 2 }} />
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