import React, { Component } from 'react'
import styled from 'styled-components'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { Div, FieldDiv, LabelDiv, getStyle } from './part'
import { commandHelper } from '../commands'

import { keyActions } from '../../actions';

export class StringKeyView extends Component {


    constructor(props) {
        super(props);
        this.state = { newKeyId: null, newKeyValue: null }
    }

    // handleKeyChange = value => {
    //     const { onKeyChange } = this.props;
    //     if (onKeyChange != null) {
    //         onKeyChange(value);
    //     }
    // }

    // handleValueChange = value => {
    //     const { onValueChange } = this.props;
    //     if (onValueChange != null) {
    //         onValueChange(value);
    //     }
    // }

    handleKeyIdChange = newKeyId => {
     //   this.setState({ newKeyId })
    }

    handleKeyValueChange = newKeyValue => {
    ???? //   this.setState({ newKeyValue })
    }

    getSaveHandle = () => {
        const { newKeyId, newKeyValue } = this.state;
        const { dispatch, redisKey } = this.props;
       
        const { key, type, connectionName, dbId, dbIdx,value } = redisKey;

        if (newKeyValue != null || newKeyId != null) {
            if (newKeyId != null) {
                const pValue = newKeyValue ? newKeyValue : value;
                dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId, commandHelper.getKeyTypeValue(type), newKeyId, pValue, key));
            }
            else {
                dispatch(keyActions.modifyStringKey(connectionName, dbIdx, dbId, commandHelper.getKeyTypeValue(type), key, newKeyValue));
            }
        }

    }

    componentDidMount() {
        const { setSaveHandle } = this.props;
        setSaveHandle(() =>this.getSaveHandle);
    }

    render() {

        const { redisKey } = this.props;

        const { connectionName, dbIdx, key, type, value, dbId } = redisKey;
        return <Div style={{ marginLeft: -20 }}>
            <div style={{ display: 'flex' }}>
                <FieldDiv>
                    <LabelDiv>{'键类型'}</LabelDiv>
                    <Input readOnly={true} style={getStyle(27, 120)} value={type} />
                </FieldDiv>
                <FieldDiv>
                    <LabelDiv>{'键名称'}</LabelDiv>
                    <Input style={getStyle(27, 220)} value={key} onKeyUp={this.handleKeyIdChange} />
                </FieldDiv>
            </div>

            <FieldDiv style={{ flex: '0 1 100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <LabelDiv >{'键值'}</LabelDiv>
                    <div style={{ flex: '0 1 100%' }} />
                </div>

                <TextArea style={getStyle('100%', '100%')} value={value} onKeyUp={this.handleKeyValueChange} />
            </FieldDiv>
        </Div>
    }
}

