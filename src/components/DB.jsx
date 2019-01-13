import React, { Component } from 'react'
import { NameDiv, FlexDiv, FlexContainerDiv, LoadingImg, } from '../controls/parts'
import { DbMenuTrigger } from './contextMenus'
import { keyActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { nodeTypes, dbStates } from '../constants'
import { withSimpleExpand, withSelectByClick } from '../controls'
import { compose } from 'recompose'
import { Key } from './Key'
import { DBIcon } from './icons'
import { isEqual } from 'lodash'

const Content = props => {
    const { name, isLoading, keys } = props;
    return <FlexDiv>
        <FlexContainerDiv>
            <DBIcon />
            <NameDiv>{`db${name}`}</NameDiv>
            {keys && keys.length > 0 && <div>{`[${keys.length}项]`}</div>}
        </FlexContainerDiv>
        {isLoading === true && <LoadingImg />}
    </FlexDiv>
}

const offSetStyle = { marginLeft: -40, width: 'calc(100% + 40px)' }

const ExpandContent = compose(withSelectByClick, withSimpleExpand)(props => <Content {...props} />)


class DB extends Component {

    constructor(props) {
        super(props);
        this.state = { keys: [] };
    }

    handleClick = () => {
        const { dispatch, connectionName, id, dbIdx, selectedDbId, selectedNodeType } = this.props;
        if (!(id === selectedDbId) || selectedNodeType !== nodeTypes.DB) {
            dispatch(dbActions.selectDB(connectionName, id, dbIdx));
        }
    }

    handleKeyItemClick = keyId => {
        const { dispatch,  selectedKeyId, selectedNodeType } = this.props;
        if (!(keyId === selectedKeyId) || selectedNodeType !== nodeTypes.KEY) {
            const redisKey=this.state.keys.find(x=>x.id===keyId); 
             dispatch(keyActions.selectKey(redisKey));
        }
    }


    handleDoubleClick = () => {
        const { dbIdx, connectionName, id, dbState } = this.props;
        if (dbState === dbStates.NONE) {
            const { dispatch } = this.props;
            dispatch(dbActions.getKeyList(connectionName, dbIdx, id));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps == null) {
            return;
        }
        if (nextProps.dbState === dbStates.KEY_LOAD_SUCCESS) {
            const { keys, selectedDbId } = nextProps;  //如果是连接成功了则缓存db集合，并且折叠展开
            if (keys != null && selectedDbId === this.props.id) {
                this.setState({ keys });
            }
        }
        else if (nextProps.dbState === dbStates.NONE) {
            this.setState({ keys: [] });
        }

    }

    isSelected = () => {
        const { id, selectedDbId, selectedNodeType } = this.props;
        if (selectedNodeType !== nodeTypes.DB) {
            return false;
        }
        return id === selectedDbId;
    }

    containSelectKey = () => {
        const { selectedNodeType, selectedKeyId } = this.props;
        if (selectedNodeType !== nodeTypes.KEY) {
            return false;
        }
        const { keys } = this.state;
        return keys.some(x => x.id === selectedKeyId);
    }

    containKey = keyId => {
        const { keys } = this.state;
        return keys.some(x => x.id === keyId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { id, isVisible } = this.props;
        if (nextProps == null) {
            return false;
        }
        if (nextProps.isVisible !== isVisible) { //处理折叠
            return true;
        }
        if (nextProps.dbState !== this.props.dbState) {
            return true;
        }
        if (this.props.selectedDbId === this.props.id) {
            if (!isEqual(this.props.keys, nextProps.keys)) { //检查keys的状态是否变化，比如刷新键
                return true;
            }
        }
        const currConnectionName = this.props.connectionName;
        const { selectedNodeType, selectedConnectionId, selectedDbId, selectedKeyId } = nextProps;
        switch (selectedNodeType) {
            case nodeTypes.CONNECTION:
                return this.isSelected() || this.containSelectKey();
            case nodeTypes.KEY:
                if (currConnectionName !== selectedConnectionId || id !== selectedDbId) {
                    return this.isSelected() || this.containSelectKey();
                }
                else if (currConnectionName === selectedConnectionId && id === selectedDbId) {
                    return this.containKey(selectedKeyId);
                }
                return false;
            case nodeTypes.DB:
                if (this.containSelectKey()) {
                    return true;
                }
                if (this.isSelected()) {
                    return id !== selectedDbId;
                }
                return id === selectedDbId;
            default:
                return false;
        }
    }

    render() {
        const {  id,dbIdx, isVisible, dispatch, selectedDbId, selectedConnectionId, connectionName, selectedNodeType, dbState, selectedKeyId } = this.props;
        const { keys } = this.state;    
       // console.log(`render db:dbIdx ${dbIdx} dbState:${dbState} selectedDbId: ${selectedDbId}  selectedConnection: ${selectedConnectionId} connection: ${connectionName}`);
        return <React.Fragment>
             {isVisible && <DbMenuTrigger connectionName={connectionName} dbId={id} dbIdx={dbIdx} dispatch={dispatch} isKeyLoaded={dbState===dbStates.KEY_LOAD_SUCCESS} >
                <ExpandContent name={dbIdx}
                    title={`DB${dbIdx}`}
                    onDoubleClick={this.handleDoubleClick}
                    isSelected={this.isSelected()}
                    handleClick={this.handleClick}
                    isLoading={dbState === dbStates.KEY_LOADING}
                    isKeyLoaded={dbState === dbStates.KEY_LOAD_SUCCESS}
                    style={offSetStyle}
                    paddingLeft={30}>
                    {keys && keys.length > 0 &&
                        keys.map(x => <Key
                            keyName={x.key}
                            id={x.id}
                            isSelected={x.id === selectedKeyId && selectedNodeType === nodeTypes.KEY}
                            keyType={x.type}
                            key={x.key}
                            handleClick={this.handleKeyItemClick}
                            dbIdx={dbIdx}
                            dbId={id}
                            connectionName={connectionName}
                            dispatch={dispatch}
                        />)}
                </ExpandContent>
            </DbMenuTrigger>}
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const { selectedNodeType } = state.state;
    const { selectedDbId } = state.db;
    const { selectedConnectionId } = state.connection;
    return { selectedNodeType, selectedDbId, selectedConnectionId, ...state.key };
}

const db = connect(mapStateToProps)(DB)

export { db as DB }