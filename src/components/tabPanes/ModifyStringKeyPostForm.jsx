import React    from 'react'
import {  keyActions } from '../../actions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../../controls'
import { ResetButton, SubmitButton } from '../controlParts'
 
import {commandHelper} from '../commands/commandHelper'

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
export const ModifyStringKeyPostForm = ({ formKey, dispatch, dbIdx, dbId, connectionName, attachMessage }) => {
    return <Formik
        initialValues={formKey}
        validationSchema={validationSchema}
        onSubmit={values => {
            const oldKey =formKey.id;
             dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId,commandHelper.getKeyTypeValue( values.type), values.id,  values.value,oldKey));
           
        }}
        render={({ values, errors, isSubmitting }) => (<div style={{ padding: 10 }}>
            <Form>
                <FormField   fieldName="type" displyName="键类型" disabled={true}/>
                 
                <FormField fieldName="id" displyName="Id" errors={errors} />
             
                <FormField component="textarea" fieldName="value" displyName="Value" errors={errors} height={150}  />
                {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>}
                <SubmitButton disabled={isSubmitting && attachMessage == null} />
                <ResetButton disabled={isSubmitting && attachMessage == null} />
            </Form>
        </div>
        )}
    />
}


 
