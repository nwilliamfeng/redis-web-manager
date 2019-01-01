import React    from 'react'
import { dbActions, dialogAction, keyActions } from '../../../actions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../../../controls'
import { ResetButton, SubmitButton } from '../../controlParts'
 
import {commandHelper} from '../commandHelper'

/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({
  
    id: Yup.string().required('Id不能为空。'),
   
    value: Yup.string().required('value不能为空。'),
})


/**
 * 提交key的form
 * @param {*} param0 
 */
export const ModifyStringKeyPostForm = ({ redisKey, dispatch, dbIdx, dbId, connectionName, attachMessage }) => {
    return <Formik
        initialValues={redisKey}
        validationSchema={validationSchema}
        onSubmit={values => {
            
             dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId,commandHelper.getKeyTypeValue( values.type), values.id,  values.value));
           
        }}
        render={({ values, errors, isSubmitting }) => (<div style={{ padding: 10 }}>
            <Form>
                <FormField   fieldName="type" displyName="键类型" disabled={true}/>
                 
                <FormField fieldName="id" displyName="Id" errors={errors} />
              
                <FormField fieldName="value" displyName="Value" errors={errors} />
                {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>}
                <SubmitButton disabled={isSubmitting && attachMessage == null} />
                <ResetButton disabled={isSubmitting && attachMessage == null} />
            </Form>
        </div>
        )}
    />
}


 
