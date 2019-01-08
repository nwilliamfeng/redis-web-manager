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
        console.log(keys);
        return keys.some(x => x.state !== entityState.NONE);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.isDirty() !== nextProps.isKeyDirty) {
            const { keys } = this.state;
            if (keys.some(x => x.state !== entityState.NONE) !== false) {
                const hkeys = keys.filter(x => x.state !== entityState.DELETED);
                hkeys.forEach(x => x.state = entityState.NONE);
                this.setState({ keys: hkeys });
            }
        }
        if (!isEqual(this.props.redisKey, nextProps.redisKey)) {
            this.clearState();
            this.initizeKeys(nextProps);
        }
    }

    handleKeyChange = value => {
        const { selectedKey, keys } = this.state;
        if (selectedKey != null) {
            const hashKey = keys.find(x => x.key === selectedKey);
            hashKey.displayKey = value;
            this.setKeyItemDirty(hashKey);
        }
    }

    setKeyItemDirty = hashKey => {
        if (hashKey.state === entityState.NONE) {
            this.notifyDirty();
            hashKey.state = entityState.MODIFIED;
        }
        this.forceUpdate();
    }

    handleValueChange = value => {
        const { selectedKey, keys } = this.state;
        if (selectedKey != null) {
            const hashKey = keys.find(x => x.key === selectedKey);
            hashKey.value = value;

            this.setKeyItemDirty(hashKey);

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
        const handleClick = () => onClick(key);
        const { selectedKey } = this.state;
        const { key, displayKey, value, state } = hashKey;
        return <Tr onClick={handleClick} key={key} isSelected={selectedKey === key}>
            <Td width={'60px'}>{idx + 1}</Td>
            <Td width={'150px'} maxWidth={'150px'}>{displayKey}</Td>
            <Td width={'60%'} maxWidth={'60%'} >{value}</Td>
            <Td width={'50px'}>{this.convertEntityState(state)}</Td>
        </Tr>
    }

    handleRowClick = key => this.setState({ selectedKey: key })

    renderTable = () => {
        const { keys } = this.state;
        return <div className='scollContainer' style={{ maxHeight: '50%', overflowX: 'hidden', overflowY: 'auto', width: '100%', minHeight: '50%' }}>
            <Table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>Key</th>
                        <th>Value</th>
                        <th>状态</th>
                    </tr>
                </thead>

                <tbody>{keys.filter(x => x.state !== entityState.DELETED).map((x, idx) => this.renderKeyRow(x, idx, this.handleRowClick))}</tbody>

            </Table>
        </div>
    }

    initizeKeys = props => {
        const { redisKey } = props;
        if (redisKey !== null) {
            const { content } = redisKey;
            const keys = Object.entries(content).map(x => {
                return { key: x[0], value: x[1], state: entityState.NONE, displayKey: x[0] }
            });
            this.setState({ keys, selectedKey: null });
        }
    }

    clearState = () => this.setState({ keys: [], selectedKey: null });

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
        delKey.state = entityState.DELETED;
        this.setState({ selectedKey: null });
        this.notifyDirty();
    }

    handleAddRow = () => {
        const { keys } = this.state;
        let keyName = `newKey${keys.filter(x => x.state === entityState.NEW).length + 1}`;
        if (keys.some(x => x.key === keyName)) {
            keyName += '_1';
        }
        const newKey = { key: keyName, displayKey: keyName, value: '', state: entityState.NEW };
        this.setState({ keys: [...keys, newKey], selectedKey: keyName });
        this.notifyDirty();
    }

    getSelectedKeyValue = () => {
        const { selectedKey, keys } = this.state;
        if (selectedKey == null) {
            return '';
        }
        const hashKey = keys.find(x => x.key === selectedKey);
        return hashKey ? hashKey.value : '';
    }

    getSelectedDisplayKey = () => {
        const { selectedKey, keys } = this.state;
        if (selectedKey == null) {
            return '';
        }
        const hashKey = keys.find(x => x.key === selectedKey);
        return hashKey ? hashKey.displayKey : '';
    }

    render() {
        console.log('render hashkey view');
        const { redisKey } = this.props;
        const { key, type, content } = redisKey;
        const { selectedKey } = this.state;

        return <Div>
            <div style={{ display: 'flex', marginLeft: -20, minHeight: 40 }}>
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

            <div style={{ maxHeight: 'calc(50% - 40px)', minHeight: 'calc(50% - 40px)', background:'red' }}>
                <FieldDiv style={{ marginTop: 15, marginBottom: 15, marginLeft: -20 }}>
                    <LabelDiv >{'Key'}</LabelDiv>
                    <Input onKeyUp={this.handleKeyChange} readOnly={selectedKey == null} style={getStyle(27, 250)} value={selectedKey ? this.getSelectedDisplayKey() : ''} />
                </FieldDiv>

                <FieldDiv style={{  marginLeft: -20,background:'green', height: 'calc(100% - 40px)'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <LabelDiv >{'Value'}</LabelDiv>
                        <div style={{ flex: '0 1 100%' }} />
                    </div>
                    <TextArea style={getStyle('100%', '100%')} readOnly={selectedKey == null} value={this.getSelectedKeyValue()} onKeyUp={this.handleValueChange} />
                </FieldDiv>
            </div>
        </Div>
    }
}