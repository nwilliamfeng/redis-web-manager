import React, { Component } from 'react'
import { NameDiv, FlexDiv, FlexContainerDiv, LoadingImg, } from '../controls/parts'
import { DbMenuTrigger } from './contextMenus'
import { keyActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { nodeTypes } from '../constants'
import { withSimpleExpand, withSelectByClick } from '../controls'
import { compose } from 'recompose'
import { Key } from './Key'
import { DBIcon } from './icons'

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
        console.log('create db ' + props.dbIdx);
        super(props);
        this.state = { keyLoaded: false, keys: [], isLoading: false };
    }

    handleClick = () => {
        const { dispatch, connectionName, dbIdx,selectedConnectionName,selectedDb,selectedNodeType } = this.props;
        if(!(connectionName===selectedConnectionName && dbIdx===selectedDb)|| selectedNodeType!==nodeTypes.DB){
            dispatch(dbActions.selectDB(connectionName, dbIdx));
        }
        
    }

    handleKeyItemClick = key => {
        const { dispatch, connectionName, dbIdx,selectedConnectionName,selectedKey,selectedDb,selectedNodeType } = this.props;
        if(!(connectionName===selectedConnectionName && dbIdx===selectedDb && key===selectedKey)|| selectedNodeType!==nodeTypes.KEY){
        dispatch(keyActions.selectKey(connectionName, dbIdx, key));
        }
    }


    handleDoubleClick = () => {
        const { keyLoaded } = this.state;
        if (keyLoaded === false) {
            const { dbIdx, connectionName } = this.props;
            this.setState({ isLoading: true });
            const { dispatch } = this.props;
            dispatch(keyActions.getKeyList(connectionName, dbIdx));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { keyLoaded,isLoading } = this.state;
        const { dbIdx, connectionName } = this.props;
        if (keyLoaded === false && isLoading===true) {
            const { keys, selectedConnectionName, selectedDb } = nextProps;
            if (keys != null && selectedConnectionName === connectionName && selectedDb === dbIdx) {
                this.setState({ keyLoaded: true, keys, isLoading: false });
            }
        }
    }

    isSelected = () => {
        const { connectionName, dbIdx, selectedDb, selectedNodeType, selectedConnectionName } = this.props;
        if (selectedNodeType !== nodeTypes.DB) {
            return false;
        }
        return dbIdx === selectedDb && connectionName===selectedConnectionName;
    }

    containSelectKey = () => {
        const { connectionName, dbIdx, selectedDb, selectedNodeType, selectedConnectionName,selectedKey } = this.props;
        if (selectedNodeType !== nodeTypes.KEY) {
            return false;
        }
        const { keys } = this.state;
        if (connectionName !== selectedConnectionName || dbIdx !== selectedDb) {
            return false;
        }
        return keys.some(x => x.key === selectedKey);
    }

    containKey = key => {
        const { keys } = this.state;
        return keys.some(x => x.key === key);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { isVisible } = this.props;
        const { keyLoaded, isLoading } = this.state;
        if (nextState != null) {
            if (nextState.keyLoaded !== keyLoaded) {//加载
                return true;
            }
            if (nextState.isLoading !== isLoading) {
                return true;
            }
        }

        if (nextProps == null) {
            return false;
        }

        if (nextProps.isVisible !== isVisible) { //处理折叠
            return true;
        }

        const currConnectionName = this.props.connectionName;
        const currDbIdx = this.props.dbIdx;
        const { selectedNodeType, selectedConnectionName, selectedDb, selectedKey } = nextProps;

        switch (selectedNodeType) {
            case nodeTypes.CONNECTION:
                return this.isSelected() || this.containSelectKey();

            case nodeTypes.KEY:
                if (currConnectionName !== selectedConnectionName || currDbIdx !== selectedDb) {
                    return this.isSelected() || this.containSelectKey();
                }
                else if (currConnectionName === selectedConnectionName && currDbIdx === selectedDb) {
                    return this.containKey(selectedKey);
                }
                return false;

            case nodeTypes.DB:
                if (this.containSelectKey()) {
                    return true;
                }
                if (this.isSelected()) {
                    return currConnectionName !== selectedConnectionName || currDbIdx !== selectedDb;
                }
                return currConnectionName === selectedConnectionName && currDbIdx === selectedDb;

            default:
                return false;

        }
    }


    render() {
        const { dbIdx, isVisible,dispatch, selectedDb, selectedConnectionName, connectionName, selectedNodeType, selectedKey } = this.props;
        const { keys, isLoading,keyLoaded } = this.state;

        console.log(`render db:dbIdx ${dbIdx} selectedDB ${selectedDb}  selectedConnection ${selectedConnectionName} connection ${connectionName}`);

        return <React.Fragment>
            {isVisible && <DbMenuTrigger  connectionName={connectionName} dbIdx={dbIdx} dispatch={dispatch} isKeyLoaded={keyLoaded} >

                <ExpandContent name={dbIdx}
                    title={`DB${dbIdx}`}
                    onDoubleClick={this.handleDoubleClick}
                    isSelected={this.isSelected()}
                    handleClick={this.handleClick}
                    isLoading={isLoading}
                    style={offSetStyle}
                    paddingLeft={30}>
                    {keys && keys.length > 0 &&
                        keys.map(x => <Key keyName={x.key}
                            isSelected={selectedDb === dbIdx && connectionName === selectedConnectionName && x.key === selectedKey && selectedNodeType === nodeTypes.KEY}
                            keyType={x.type}
                            key={x.key}
                            handleClick={this.handleKeyItemClick}
                            dbIdx={dbIdx}
                            connectionName={connectionName}
                            dispatch={dispatch}
                            />)}
                </ExpandContent>
            </DbMenuTrigger>}
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const { selectedNodeType} = state.state;
    const {selectedDb} =state.db;
    const {selectedConnectionName}=state.connection;
    return { selectedNodeType, selectedDb,selectedConnectionName,  ...state.key };
}


const db = connect(mapStateToProps)(DB)

export { db as DB }