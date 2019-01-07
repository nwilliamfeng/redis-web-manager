import React, { Component } from 'react'
import styled from 'styled-components'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { isEqual } from 'lodash'
import {entityState} from '../../constants'
import {keyActions} from '../../actions'
import {commandHelper} from '../commands'
import { Div, FieldDiv, LabelDiv, getStyle, Td, Tr, Table, Button } from './part'


const HDiv = styled.div`
    width:100%;
    display:flex;
`

export class HashKeyView extends Component {

    constructor(props) {
        super(props);
        this.state = { keys: [], selectedKey: null };
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (nextProps == null) {
    //         return false;
    //     }
    //     if (isEqual(this.props.redisKey, nextProps.redisKey)) {
    //         if (this.state.selectedKey !== nextState.selectedKey) {
    //             return true;
    //         }
    //         if (isEqual(this.state.modifyKeys, nextState.modifyKeys)) {
    //             return true;
    //         }
    //         return false;
    //     }
    //     return true;
    // }

    isDirty=()=>{
        const {keys} =this.state;
        return keys.some(x=>x.state!==entityState.NONE);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(this.isDirty()!==nextProps.isKeyDirty){
            this.state.keys.forEach(x=>x.state=entityState.NONE);

        }
        if ( !isEqual(this.props.redisKey, nextProps.redisKey)) {
            this.clearState();
            this.initizeKeys(nextProps);
        }
    }

    handleKeyChange = value => {
        const { onKeyChange } = this.props;
        if (onKeyChange != null) {
            onKeyChange(value);
        }

    }

    handleValueChange = value => {
        const { selectedKey,keys } = this.state;
        if (selectedKey!=null){
            const hashKey =keys.find(x=>x.key===selectedKey);
            
            hashKey.value =value;
            if(hashKey.state!==entityState.MODIFIED){
                this.notifyDirty();
                hashKey.state=entityState.MODIFIED;
                this.forceUpdate();
            }
          
        }
    }

    notifyDirty=()=>{
        const {dispatch} =this.props;
        dispatch(keyActions.setKeyDirty());
    }

    renderKeyRow = (hashKey, idx, onClick) => {
        const handleClick = () => {
            onClick(key);
        }
        const num = idx + 1;
        const { selectedKey } = this.state;
        const { key, value, state } = hashKey;
        return <Tr onClick={handleClick} key={key} isSelected={selectedKey === key}>
            <Td width={'60px'}>{state!==entityState.NONE ? <span><span style={{fontWeight:'bold',fontSize:14}}>{'*'}</span>{num}</span>   : num}</Td>
            <Td width={'150px'}>{key}</Td>
            <Td width={'70%'}>{value}</Td>
        </Tr>
    }

    

    handleRowClick = key => {
        this.setState({ selectedKey: key });
    }

    renderTable = () => {
        const {keys} =this.state;
        return <Table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>{keys.map((x, idx) => this.renderKeyRow(x, idx, this.handleRowClick))}</tbody>
        </Table>
    }

    initizeKeys = props => {

        const { redisKey } = props;
        if (redisKey !== null) {
            const { content } = redisKey;
            const keys = Object.entries(content).map(x => {
                return { key: x[0], value: x[1], state: entityState.NONE }
            });
            this.setState({ keys, selectedKey: null });
        }

    }

    clearState() {
        this.setState({ keys: [], selectedKey: null });
    }

    getSaveHandle = () => {
        const hashKeys = this.state.keys.filter(x=>x.state!==entityState.NONE);
        const { dispatch, redisKey } = this.props;
        const { key, type, connectionName, dbId, dbIdx } = redisKey;
        hashKeys.forEach(x=>{
            dispatch(keyActions.modifyKey(connectionName, dbIdx, dbId, commandHelper.getKeyTypeValue(type), key, x.key, x.value));
        });
                
        
    }

    componentDidMount() {
        this.clearState();
        this.initizeKeys(this.props);
        const { setSaveHandle } = this.props;
        setSaveHandle(this.getSaveHandle);
    }



    getSelectedKeyValue = () => {
        const { selectedKey, keys } = this.state;
        if (selectedKey == null) {
            return '';
        }
        const hashKey=keys.find(x => x.key === selectedKey);
        return hashKey?hashKey.value:'';
    }

    render() {
        console.log('render hashkey view');
        const { redisKey } = this.props;

        const { key, type, content } = redisKey;
        const { selectedKey } = this.state;

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
                {this.renderTable(content)}
                <div>
                    <Button>{'添加行'}</Button>
                    <Button style={{ marginTop: 10 }}>{'删除行'}</Button>
                </div>
            </HDiv>

            <FieldDiv style={{ marginTop: 15, marginBottom: 15, marginLeft: -20 }}>
                <LabelDiv >{'Key'}</LabelDiv>
                <Input readOnly={true} style={getStyle(27, 250)} value={selectedKey ? selectedKey : ''} />
            </FieldDiv>

            <FieldDiv style={{ flex: '0 1 55%', marginLeft: -20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <LabelDiv >{'Value'}</LabelDiv>
                    <div style={{ flex: '0 1 100%' }} />
                </div>

                <TextArea style={getStyle('100%', '100%')} readOnly={selectedKey==null} value={this.getSelectedKeyValue()} onKeyUp={this.handleValueChange} />
            </FieldDiv>
        </Div>
    }
}