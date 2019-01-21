import React, { Component } from 'react'
import { Input } from '../../controls/Input'
import { isEqual } from 'lodash'
import { TextArea } from '../../controls/TextArea'
import { Div, FieldDiv, LabelDiv, getStyle } from './part'
import {  locator } from '../../utils'
import { keyActions } from '../../actions';

export class StringKeyView extends Component {


    constructor(props) {
        super(props);
        this.state = { newKeyId: null, newKeyValue: null, isDirty: false, }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

         if(nextProps.isKeyDirty===false && this.state.isDirty===true){
             return true;
         }
         return !isEqual(this.props.redisKey, nextProps.redisKey);
    }

    checkDirty = () => {
        const { isDirty } = this.state;
        if (isDirty !== true) {
            const { dispatch } = this.props;
            dispatch(keyActions.setKeyDirty());
        }
    }

    handleKeyIdChange = newKeyId => {
        this.checkDirty();
        this.setState({ newKeyId, isDirty: true })
    }

    handleKeyValueChange = newKeyValue => {

        this.checkDirty();
        this.setState({ newKeyValue, isDirty: true });
    }

    getSaveHandle = () => {
        const { newKeyId, newKeyValue } = this.state;
        const { dispatch, redisKey } = this.props;
        const { key, type, connectionName, dbId, dbIdx, content } = redisKey;
        if (newKeyValue != null || newKeyId != null) {
            const pValue = newKeyValue ? newKeyValue : content;
            if (newKeyId != null) {
                dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId, locator.getKeyTypeValue(type), newKeyId, pValue, key));
            }
            else {
                dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId, locator.getKeyTypeValue(type), key, pValue));
            }
        }
    }

    clearState = () => {
        this.setState({ newKeyId: null, newKeyValue: null, isDirty: false });
    }

    componentDidMount() {
        const { setSaveHandle } = this.props;
        this.clearState();
        setSaveHandle(this.getSaveHandle);
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (this.state.isDirty !== nextProps.isKeyDirty) {
            this.setState({ isDirty: false });
        }
        if (!isEqual(this.props.redisKey, nextProps.redisKey)) {
            this.clearState();
        }
    }

    render() {

        const { redisKey } = this.props;

        const { key, type, content } = redisKey;
        return <Div style={{ marginLeft: -20 }}>
            <div style={{ display: 'flex' }}>
                <FieldDiv>
                    <LabelDiv>{'键类型'}</LabelDiv>
                    <Input readOnly={true} style={getStyle(27, 120)} value={type} />
                </FieldDiv>
                <FieldDiv>
                    <LabelDiv>{'键名称'}</LabelDiv>
                    <Input style={getStyle(27, 220)} value={key ? key : ''} onValueChange={this.handleKeyIdChange} />
                </FieldDiv>
            </div>

            <FieldDiv style={{ flex: '0 1 100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <LabelDiv >{'键值'}</LabelDiv>
                    <div style={{ flex: '0 1 100%' }} />
                </div>

                <TextArea style={getStyle('100%', '100%')} value={content ? content : ''} onValueChange={this.handleKeyValueChange} />
            </FieldDiv>
        </Div>
    }
}

