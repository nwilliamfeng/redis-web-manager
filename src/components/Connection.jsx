import React, { Component } from 'react'
import { Li, NameDiv, FlexDiv, FlexContainerDiv, LoadingImg } from '../controls/parts'
 import { contextMenuIds } from '../constants/contextMenuIds'
import { connectionActions, dbActions, commandAction } from '../actions'
import { connect } from 'react-redux'
import { nodeTypes, commandConstants } from '../constants'
import { withExpand, withSelectByClick } from '../controls'
import { compose } from 'recompose'
import { DB } from './DB'
import { ConnectionIcon, ConnectionSuccessIcon } from './icons'
import {ConnectionContextMenu, ConnectionMenuTrigger} from './contextMenus'

const Content = props => {
    const { dbs, item, isLoading, isConnected } = props;
    return <FlexDiv>
        <FlexContainerDiv >
            {isConnected===false && <ConnectionIcon />}
            {isConnected === true && <ConnectionSuccessIcon />}

            <NameDiv>{item.name}</NameDiv>
            {dbs && dbs.length > 0 && <div>{`[${dbs.length}项]`}</div>}
        </FlexContainerDiv>
        <div>{isLoading === true && <LoadingImg />}</div>
    </FlexDiv>
}

 

const ExpandContent = compose(withSelectByClick, withExpand)(props => <Content {...props} />)

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = { dbs: [], isLoading: false, isExpand: true };

    }

    handleClick = () => {
        const { dispatch, item } = this.props;
        dispatch(connectionActions.selectConnection(item.name));
    }

    handleDoubleClick = () => {
        
        if (!this.isConnected()) {
            this.setState({ isLoading: true });
            const { dispatch, item } = this.props;
            dispatch(dbActions.getDbList(item.name));
        }
    }

    isConnected=()=>{
        const {loadedConnections,item} =this.props;
        return loadedConnections.some(x=>x===item.name)===true;
    }

    componentWillReceiveProps(nextProps, nextContext) {
      
        if (!this.isConnected()) {
            const { dbs, connection, item } = nextProps;
            if (dbs != null && connection === item.name) {
                this.setState({ dbs, isLoading: false });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { item, selectedConnection, selectNodeType } = this.props;
        const {  isLoading, isExpand } = this.state;
        if (nextState != null) {
          
            if (nextState.isLoading !== isLoading) {
                return true;
            }

            if (nextState.isExpand !== isExpand) {
                return true;
            }
        }
        if (nextProps != null) {
            if(!this.isConnected()&& nextProps.loadedConnections.some(x=>x===item.name)){
                return true;
            }
            if (selectedConnection === item.name && nextProps.selectedNodeType !== nodeTypes.CONNECTION) {
                return true;
            }
            if (item.name === selectedConnection && nextProps.selectedConnection !== item.name) {
                return true;
            }
            if (item.name !== selectedConnection && nextProps.selectedConnection === item.name) {
                return true;
            }
            if (selectedConnection === item.name && nextProps.selectedNodeType !== selectNodeType) {
                return true;
            }
        }

        return false;
    }

    handleExpand = isExpand => {
        this.setState({ isExpand });
    }

    render() {
        const { item, selectedConnection, selectedNodeType,dispatch } = this.props;
        const { dbs, isLoading, isExpand } = this.state;
        console.log('render connection ' + item.name);
        const isConnected=this.isConnected();
        const isSelected = selectedNodeType === nodeTypes.CONNECTION && selectedConnection === item.name;
        return <React.Fragment>
            {item && <ConnectionMenuTrigger  connection={item} dispatch={dispatch} isConnected={isConnected} >
                <Li title={item.name} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent
                        handleClick={this.handleClick}
                        item={item}
                        isSelected={isSelected}
                        isConnected={isConnected}
                        dbs={dbs}
                        isLoading={isLoading}
                        handleExpand={this.handleExpand}
                        isExpand={isExpand}>
                        {dbs && dbs.length > 0 && dbs.map(x => <DB key={x} dbIdx={x} connectionName={item.name} isVisible={isExpand} />)}
                    </ExpandContent>
                </Li>
            </ConnectionMenuTrigger>}

        </React.Fragment>

    }
}

function mapStateToProps(state) {
    const { connections } = state.connection;
    const { dbs, connection,loadedConnections } = state.db;
    const { selectedConnection, selectedNodeType } = state.state;
    return { connections, selectedConnection, dbs, connection, selectedNodeType,loadedConnections };
}


const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }