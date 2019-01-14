import React, { Component } from 'react'
import { Input } from '../../controls/Input'
import { TextArea } from '../../controls/TextArea'
import { isEqual } from 'lodash'
import { entityState, keyType } from '../../constants'
import { keyActions } from '../../actions'
import { commandHelper } from '../commands'
import { Div, FieldDiv, LabelDiv, getStyle, KeysDiv, Button } from './part'
import { KeyTable } from './KeyTable';

export class AggregateKeyView extends Component {

    constructor(props) {
        super(props);
        this.state = { keys: [], selectedKey: null };
    }

    isDirty = () => {
        const { keys } = this.state;
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
            const sKey = keys.find(x => x.key === selectedKey);
            sKey.displayKey = value;
            this.setKeyItemDirty(sKey);
        }
    }

    setKeyItemDirty = sKey => {
        if (sKey.state === entityState.NONE) {
            this.notifyDirty();
            sKey.state = entityState.MODIFIED;
        }
        this.forceUpdate();
    }

    handleValueChange = value => {
        const { selectedKey, keys } = this.state;
        if (selectedKey != null) {
            const sKey = keys.find(x => x.key === selectedKey);
            sKey.value = value;
            this.setKeyItemDirty(sKey);
        }
    }

    notifyDirty = () => {
        const { dispatch } = this.props;
        dispatch(keyActions.setKeyDirty());
    }


    handleRowClick = key => this.setState({ selectedKey: key })

    renderTable = () => {
        const { keys, selectedKey } = this.state;
        return <KeyTable keys={keys} selectedKey={selectedKey} onRowClick={this.handleRowClick} />
    }

    initizeKeys = props => {
        const { redisKey } = props;
        if (redisKey !== null) {
            const { content, type } = redisKey;
            const getKeyName = array => {
                if (type === keyType.HASH ||type === keyType.LIST ) {
                    return array[0];
                }
                else if (type === keyType.SET) {
                    return array[1];
                }
                else if (type === keyType.ZSET) {
                    return array[1].Value;
                }          
            }           
            const keys = Object.entries(content).map(x => (
                { key: getKeyName(x), 
                    value:type === keyType.ZSET?x[1].Value:x[1], 
                    type, state: entityState.NONE, 
                    displayKey:type === keyType.ZSET?x[1].Score: getKeyName(x), 
                }));
            this.setState({ keys, selectedKey: null });
        }
    }

    clearState = () => this.setState({ keys: [], selectedKey: null });

    getSaveHandle = () => {
        const sKeys = this.state.keys.filter(x => x.state !== entityState.NONE);
        const { dispatch, redisKey } = this.props;
        const { key, type, connectionName,  dbIdx } = redisKey;     
        dispatch(keyActions.modifyKey(connectionName, dbIdx,  commandHelper.getKeyTypeValue(type), key, sKeys));
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
         const keyName=this.props.redisKey.type===keyType.ZSET?'0':null;
        // let keyName = `newKey${keys.filter(x => x.state === entityState.NEW).length + 1}`;
        // const setKeyName = () => {
        //     if (keys.some(x => x.key === keyName)) {
        //         keyName += '_1';
        //         setKeyName();
        //     }
        // }
       // setKeyName();
        const newKey = { key: keyName, type: this.props.redisKey.type, displayKey: keyName, value: '', state: entityState.NEW };
        this.setState({ keys: [...keys, newKey], selectedKey: keyName });
        this.notifyDirty();
    }

    getSelectedKeyValue = () => {
        const { selectedKey, keys } = this.state;
        if (selectedKey == null) {
            return '';
        }
        const sKey = keys.find(x => x.key === selectedKey);
        return sKey ? sKey.value : '';
    }

    getSelectedDisplayKey = () => {
        const { selectedKey, keys } = this.state;
        if (selectedKey == null) {
            return '';
        }
        const sKey = keys.find(x => x.key === selectedKey);
        return sKey ? sKey.displayKey : '';
    }

    render() {
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
            <KeysDiv>
                {this.renderTable(content)}
                <div>
                    <Button onClick={this.handleAddRow} >{'添加行'}</Button>
                    <Button onClick={this.handleDeleteRow} style={{ marginTop: 10 }} disabled={selectedKey == null}>{'删除行'}</Button>
                </div>
            </KeysDiv>
            <div style={{ height: 'calc(100% - 300px)' }}>
               {(type===keyType.HASH || type===keyType.ZSET) && <FieldDiv style={{ marginBottom: 15, marginLeft: -20 }}>
                    <LabelDiv >{type===keyType.HASH? 'Key':'Score'}</LabelDiv>
                    <Input type={type===keyType.ZSET?'number':'input'} onValueChange={this.handleKeyChange} readOnly={selectedKey == null} style={getStyle(27, 250)} value={selectedKey ? this.getSelectedDisplayKey() : ''} />
                </FieldDiv>}
                <FieldDiv style={{ marginLeft: -20, height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <LabelDiv >{'Value'}</LabelDiv>
                        <div style={{ flex: '0 1 100%' }} />
                    </div>
                    <TextArea style={getStyle('100%', '100%')} readOnly={selectedKey == null} value={this.getSelectedKeyValue()} onValueChange={this.handleValueChange} />
                </FieldDiv>
            </div>
        </Div>
    }
}