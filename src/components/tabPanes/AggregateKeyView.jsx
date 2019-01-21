import React, { Component } from 'react'
import { Input } from '../../controls/Input'
import { TextArea } from '../../controls/TextArea'
import { isEqual } from 'lodash'
import { entityState, keyType } from '../../constants'
import { keyActions } from '../../actions'
import { locator, mathUtil } from '../../utils'
import { Div, FieldDiv, LabelDiv, getStyle, KeysDiv, Button } from './part'
import { KeyTable } from './KeyTable';

export class AggregateKeyView extends Component {

    constructor(props) {
        super(props);
        this.initizeKeys(this.props);
    }

    isDirty = () => {
        const { keys } = this.state;
        return keys.some(x => x.state !== entityState.NONE);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.isKeyDirty === false && this.isDirty()) {
            return true;
        }
        if (!isEqual(this.state, nextState)) {
            return true;
        }
        return !isEqual(this.props.redisKey, nextProps.redisKey);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if ((this.isDirty() && nextProps.isKeyDirty === false) ||  !isEqual(this.props.redisKey,  nextProps.redisKey)) {
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

    initizeKeys = (props) => {
        const { redisKey } = props;
        if (redisKey !== null) {
            const { content, type } = redisKey;
            const getKeyName = array => {
                if (type === keyType.HASH || type === keyType.LIST) {
                    return array[0];
                }
                else if (type === keyType.SET) {
                    return array[1];
                }
                else if (type === keyType.ZSET) {
                    return array[1].Value;
                }
            }
            const keys =content? Object.entries(content).map(x => (
                {
                    key: getKeyName(x),
                    value: type === keyType.ZSET ? x[1].Value : x[1],
                    type, state: entityState.NONE,
                    displayKey: type === keyType.ZSET ? x[1].Score : getKeyName(x),
                })) :[];
            const oldSelectedKey = this.state ? this.state.selectedKey : null;
            const data = { keys, selectedKey: keys.some(k => k.key === oldSelectedKey) ? oldSelectedKey : null };
            if (this.state == null) {
                this.state = data;
            }
            else {
                this.setState({ ...data });
            }
        }
    }

    clearState = () => this.setState({ keys: [], selectedKey: null });

    getSaveHandle = () => {
        const sKeys = this.state.keys.filter(x => x.state !== entityState.NONE);
        const { dispatch, redisKey } = this.props;
        const { key, type, connectionName, dbIdx,dbId } = redisKey;
        dispatch(keyActions.modifyKey(connectionName,dbId, dbIdx, locator.getKeyTypeValue(type), key, sKeys));
    }

    componentDidMount() {
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
        const keyName = this.props.redisKey.type === keyType.ZSET ? '0' : mathUtil.guid();
        const newKey = { key: keyName, type: this.props.redisKey.type, displayKey: '', value: '', state: entityState.NEW };
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

    handleKeyDown=e=>{
        if(e.key==='ArrowDown' || e.key==='ArrowUp'){
            const { selectedKey, keys } = this.state;
            if(keys.length!==0){
                const idx =keys.findIndex(x=>x.key===selectedKey)
                if((e.key==='ArrowDown') && (idx<keys.length-1)){
                    this.setState({selectedKey:keys[idx+1].key});
                }
                else if((e.key==='ArrowUp') && (idx>0)){
                    this.setState({selectedKey:keys[idx-1].key});
                }  
            }           
        }      
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
        const { key, type } = this.props.redisKey;
        const { selectedKey } = this.state;
        return <Div tabIndex={0} onKeyDown={this.handleKeyDown}>
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
                {this.renderTable()}
                <div>
                    <Button onClick={this.handleAddRow} >{'添加行'}</Button>
                    <Button onClick={this.handleDeleteRow} style={{ marginTop: 10 }} disabled={selectedKey == null}>{'删除行'}</Button>
                </div>
            </KeysDiv>
            <div style={{ height: 'calc(100% - 300px)' }}>
                {(type === keyType.HASH || type === keyType.ZSET) && <FieldDiv style={{ marginBottom: 15, marginLeft: -20 }}>
                    <LabelDiv >{type === keyType.HASH ? 'Key' : 'Score'}</LabelDiv>
                    <Input type={type === keyType.ZSET ? 'number' : 'input'} onValueChange={this.handleKeyChange} readOnly={selectedKey == null} style={getStyle(27, 250)} value={selectedKey ? this.getSelectedDisplayKey() : ''} />
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