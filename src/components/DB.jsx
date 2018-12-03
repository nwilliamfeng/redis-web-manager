import React, { Component } from 'react'
import { NameDiv, FlexDiv, FlexContainerDiv, LoadingImg, } from '../controls/parts'
import { ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from '../constants/contextMenuIds'
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
        const { dispatch, connectionName, dbIdx } = this.props;
        dispatch(dbActions.selectDB(connectionName, dbIdx));
    }

    handleKeyItemClick = key => {
        const { dispatch, connectionName, dbIdx } = this.props;
        dispatch(keyActions.selectKey(connectionName, dbIdx, key));
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
        const { keyLoaded } = this.state;
        const { dbIdx, connectionName } = this.props;
        if (keyLoaded === false) {
            const { keys, connectionOfKey, dbOfKey } = nextProps;
            if (keys != null && connectionOfKey === connectionName && dbOfKey === dbIdx) {
                this.setState({ keyLoaded: true, keys, isLoading: false });
            }
        }
    }

    isSelected = () => {
        const { connectionName, dbIdx, selectedDB, selectedNodeType, selectedConnection } = this.props;
        if (selectedNodeType !== nodeTypes.DB) {
            return false;
        }
        if (connectionName !== selectedConnection) {
            return false;
        }
        return dbIdx === selectedDB;
    }

    containSelectKey = () => {
        const { connectionName, dbIdx, selectedDB, selectedKey, selectedNodeType, selectedConnection } = this.props;
        if (selectedNodeType !== nodeTypes.KEY) {
            return false;
        }
        const { keys } = this.state;
        if (connectionName !== selectedConnection || dbIdx !== selectedDB) {
            return false;
        }
        return keys.some(x => x.key === selectedKey);
    }

    containKey =key=>{
        const { keys } = this.state;    
        return keys.some(x => x.key === key);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {  isVisible } = this.props;
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
        
        const currConnectionName=this.props.connectionName;
        const currDbIdx=this.props.dbIdx;
        const currSelectedNodeType=this.props.selectedNodeType;
        const {selectedNodeType,selectedConnection,selectedDB,selectedKey}=nextProps;

        switch(selectedNodeType){
            case nodeTypes.CONNECTION:              
                return this.isSelected() || this.containSelectKey();

            case nodeTypes.KEY:
                if( currConnectionName!==selectedConnection || currDbIdx!==selectedDB ){
                    return   this.isSelected() || this.containSelectKey();
                }
                else  if( currConnectionName===selectedConnection && currDbIdx===selectedDB ){
                    return    this.containKey(selectedKey);
                }

            case nodeTypes.DB:
                if(this.containSelectKey()){
                    return true;
                }
                if(this.isSelected())
                    return currConnectionName!==selectedConnection || currDbIdx!==selectedDB;
                return currConnectionName===selectedConnection && currDbIdx===selectedDB ;
                
            default:
                return false;
                
        }      
    }


render() {
    const { dbIdx, isVisible, selectedDB, selectedConnection, connectionName, selectedNodeType, selectedKey } = this.props;
    const { keys, isLoading } = this.state;

    console.log(`render db:dbIdx ${dbIdx} selectedDB ${selectedDB}  selectedConnection ${selectedConnection} connection ${connectionName}`);

    return <React.Fragment>
        {isVisible && <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>

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
                        isSelected={selectedDB === dbIdx && connectionName === selectedConnection && x.key === selectedKey && selectedNodeType === nodeTypes.KEY}
                        keyType={x.type}
                        key={x.key}
                        handleClick={this.handleKeyItemClick} />)}
            </ExpandContent>
        </ContextMenuTrigger>}
    </React.Fragment>
}
}

function mapStateToProps(state) {
    const { selectedNodeType, selectedDB, selectedConnection, selectedKey } = state.state;
    return { selectedNodeType, selectedDB, selectedConnection, selectedKey, ...state.key };
}


const db = connect(mapStateToProps)(DB)

export { db as DB }