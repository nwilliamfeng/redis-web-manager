import React, { Component } from 'react'
import styled from 'styled-components'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { isEqual } from 'lodash'
import { entityState } from '../../constants'
import { keyActions } from '../../actions'
import { commandHelper } from '../commands'
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

    isDirty = () => {
        const { keys } = this.state;
        return keys.some(x => x.state !== entityState.NONE);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if (this.isDirty() !== nextProps.isKeyDirty) {
            const keys =this.state.keys.filter(x=>x.state!==entityState.DELETED);
            keys.forEach(x => x.state = entityState.NONE);
            this.setState({keys});

        }
        if (!isEqual(this.props.redisKey, nextProps.redisKey)) {
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
        const { selectedKey, keys } = this.state;
        if (selectedKey != null) {
            const hashKey = keys.find(x => x.key === selectedKey);
            hashKey.value = value;
            if (hashKey.state !== entityState.MODIFIED) {
                this.notifyDirty();
                hashKey.state = entityState.MODIFIED;
                this.forceUpdate();
            }
        }
    }

    notifyDirty = () => {
        const { dispatch } = this.props;
        dispatch(keyActions.setKeyDirty());
    }

    convertEntityState = state => {
        switch (state) {
            case entityState.MODIFIED:
                return '已修改';
            case entityState.NONE:
                return '';
            case entityState.DELETED:
                return '已删除';
            case entityState.NEW:
                return '新建';
            default:
                return '';
        }
    }

    renderKeyRow = (hashKey, idx, onClick) => {
        const handleClick = () => {
            onClick(key);
        }
        const { selectedKey } = this.state;
        const { key, value, state } = hashKey;
        return <Tr onClick={handleClick} key={key} isSelected={selectedKey === key}>
            <Td width={'60px'}>{idx + 1}</Td>
            <Td width={'150px'}>{key}</Td>
            <Td width={'60%'}>{value}</Td>
            <Td width={'50px'}>{this.convertEntityState(state)}</Td>
        </Tr>
    }



    handleRowClick = key => {
        this.setState({ selectedKey: key });
    }

    renderTable = () => {
        const { keys } = this.state;
        console.log(keys);
        return <Table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>{keys.filter(x=>x.state!==entityState.DELETED).map((x, idx) => this.renderKeyRow(x, idx, this.handleRowClick))}</tbody>
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
        const hashKeys = this.state.keys.filter(x => x.state !== entityState.NONE);
        const { dispatch, redisKey } = this.props;
        const { key, type, connectionName, dbId, dbIdx } = redisKey;
        dispatch(keyActions.modifyKey(connectionName, dbIdx, dbId, commandHelper.getKeyTypeValue(type), key, hashKeys));
 

    }

    componentDidMount() {
        this.clearState();
        this.initizeKeys(this.props);
        const { setSaveHandle } = this.props;
        setSaveHandle(this.getSaveHandle);
    }

    handleDeleteRow = () => {
        const { selectedKey, keys } = this.state;
        const delKey = keys.find(x => x.key === selectedKey);
        delKey.state=entityState.DELETED;
        this.setState({selectedKey:null});
        this.notifyDirty();
        this.forceUpdate();
    }

    handleAddRow = () => {
        const { keys } = this.state;
        const newKey={key:`newKey${keys.filter(x=>x.state===entityState.NEW).length+1}`,value:'',state:entityState.NEW};
        this.notifyDirty();
      ???? 为啥添加没更新？
        this.setState({keys:[...keys,newKey], selectedKey:newKey.key});
       
      //  this.forceUpdate();
    }

    getSelectedKeyValue = () => {
        const { selectedKey, keys } = this.state;
        if (selectedKey == null) {
            return '';
        }
        const hashKey = keys.find(x => x.key === selectedKey);
        return hashKey ? hashKey.value : '';
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
                    <Button onClick={this.handleAddRow} >{'添加行'}</Button>
                    <Button onClick={this.handleDeleteRow} style={{ marginTop: 10 }} disabled={selectedKey == null}>{'删除行'}</Button>
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

                <TextArea style={getStyle('100%', '100%')} readOnly={selectedKey == null} value={this.getSelectedKeyValue()} onKeyUp={this.handleValueChange} />
            </FieldDiv>
        </Div>
    }
}