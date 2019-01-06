import React, { Component } from 'react'
import styled from 'styled-components'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { Div, FieldDiv, LabelDiv, getStyle, Td, Tr, Table, Button } from './part'


const HDiv = styled.div`
    width:100%;
    display:flex;

`


export class HashKeyView extends Component {

    constructor(props) {
        super(props);
        this.state = { keys: [], selectedKey: null,modifyKeys:[] };
    }

    handleKeyChange = value => {
        const { onKeyChange } = this.props;
        if (onKeyChange != null) {
            onKeyChange(value);
        }
    }

    renderKeyRow = (hashKey, idx, onClick) => {
        const handleClick = () => {
            onClick(key);
        }
        const { selectedKey } = this.state;
        const { key, value } = hashKey;
        return <Tr onClick={handleClick} key={key} isSelected={selectedKey === key}>
            <Td width={'60px'}>{idx}</Td>
            <Td width={'150px'}>{key}</Td>
            <Td width={'70%'}>{value}</Td>
        </Tr>
    }

    handleValueChange = value => {
        const { onValueChange } = this.props;
        if (onValueChange != null) {
            onValueChange(value);
        }
    }

    handleRowClick = key => {
        this.setState({ selectedKey: key });
    }

    renderTable = hashBody => {
        const hashKeys = Object.entries(hashBody).map(x => {
            return { key: x[0], value: x[1] }
        });
        return <Table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>{hashKeys.map((x, idx) => this.renderKeyRow(x, idx, this.handleRowClick))}</tbody>
        </Table>
    }

    initizeKeys = () => {
        const { redisKey } = this.props;
        if (redisKey !== null) {
            const { hashBody } = redisKey;
            const keys = Object.entries(hashBody).map(x => {
                return { key: x[0], value: x[1] }
            });
            this.setState({ keys, selectedKey: null });
        }

    }

    componentDidMount() {
        this.initizeKeys();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.initizeKeys();
    }

    getSelectedKeyValue=()=>{
        const {selectedKey,keys} =this.state;
        if(selectedKey==null){
            return '';
        }
        return keys.find(x=>x.key===selectedKey).value;
    }

    render() {

        const { redisKey } = this.props;

        const { key, type, hashBody } = redisKey;
        // console.log(hashBody);
        const {selectedKey} =this.state;

        return <Div>
            <div style={{ display: 'flex', marginLeft: -20 }}>
                <FieldDiv>
                    <LabelDiv >{'键类型'}</LabelDiv>
                    <Input readOnly={true} style={getStyle(27, 120)} value={type} />
                </FieldDiv>
                <FieldDiv>
                    <LabelDiv>{'键名称'}</LabelDiv>
                    <Input style={getStyle(27, 220)} readOnly={true} value={key} />
                </FieldDiv>
            </div>

            <HDiv>
                {this.renderTable(hashBody)}
                <div>
                    <Button>{'添加行'}</Button>
                    <Button style={{ marginTop: 10 }}>{'删除行'}</Button>
                </div>
            </HDiv>

            <FieldDiv style={{marginTop:15,marginBottom:15,marginLeft:-20}}>
                <LabelDiv >{'Key'}</LabelDiv>
                <Input readOnly={true} style={getStyle(27, 250)} value={ selectedKey?selectedKey:''} />
            </FieldDiv>

            <FieldDiv style={{ flex: '0 1 55%',marginLeft:-20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <LabelDiv >{'Value'}</LabelDiv>
                    <div style={{ flex: '0 1 100%' }} />
                </div>

                <TextArea style={getStyle('100%', '100%')} value={this.getSelectedKeyValue()} onKeyUp={this.handleValueChange} />
            </FieldDiv>
        </Div>
    }
}