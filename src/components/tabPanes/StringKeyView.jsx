import React, { Component } from 'react'
import styled from 'styled-components'
import {Input} from '../Input'
import {TextArea} from '../TextArea'

const getStyle = (height = 27, width = '100%') => {

    return { borderRadius: 1, height, width, padding: '1px 5px', fontSize: 13 };
}
const errorStyle = {
    borderColor: 'red',
    boxShadow: '0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6)',
    outline: '0 none',

}

const Div = styled.div`
    display:flex;
    flex-direction:column;
    padding:15px;
    width:100%;
    height:100%;
`

const FieldDiv = styled.div`
    display:flex;
    margin-bottom:15px;
    align-items:center;
`
const LabelDiv = styled.div`
    display:flex;
    text-align:right;
    margin-right:15px;
    justify-content:flex-end;
    width:60px;
    min-width:60px;
`

// const Input = ({ style, readOnly, value }) => {
//     return <input readOnly={readOnly} style={style} className='form-control' value={value} />
// }

 
export class StringKeyView extends Component {

    onKeyChange=value=>{
        console.log('key change '+value);
    }

    onValueChange=value=>{
        console.log('value change '+value);
    }

    render() {

        const { redisKey } = this.props;
       
        const { connectionName, dbIdx, key, type, value, dbId } = redisKey;
        return <Div>
            <FieldDiv>
                <LabelDiv>{'键类型'}</LabelDiv>
                <Input readOnly={true} style={getStyle(27, 220)} value={type} />
            </FieldDiv>
            <FieldDiv>
                <LabelDiv>{'键名称'}</LabelDiv>
                <Input style={getStyle(27, 220)} value={key} onKeyPress={this.onKeyChange}/>
            </FieldDiv>
            <FieldDiv style={{ flex: '0 1 100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <LabelDiv >{'键值'}</LabelDiv>
                    <div style={{ flex: '0 1 100%' }} />
                </div>

                <TextArea style={getStyle('100%', '100%')} value={value} onKeyPress={this.onValueChange}/>
            </FieldDiv>
        </Div>
    }
}