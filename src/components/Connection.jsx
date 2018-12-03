import React, { Component } from 'react'
import { Li,  NameDiv, FlexDiv, FlexContainerDiv, LoadingImg } from '../controls/parts'
import { ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from '../constants/contextMenuIds'
import { connectionActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { nodeTypes} from '../constants'
import { withExpand, withSelectByClick } from '../controls'
import { compose } from 'recompose'
import { DB } from './DB'
import {ConnectionIcon,ConnectionSuccessIcon} from './icons'

const Content = props => {
    const { dbs, item, isLoading,connState } = props;
    return <FlexDiv>
        <FlexContainerDiv >
            {connState===connectionState.NONE && <ConnectionIcon/>}
            {connState===connectionState.CONNECT_SUCCESS && <ConnectionSuccessIcon/>}
         
            <NameDiv>{item.name}</NameDiv>
            {dbs && dbs.length > 0 && <div>{`[${dbs.length}项]`}</div>}
        </FlexContainerDiv>
        <div>{isLoading === true && <LoadingImg />}</div>
    </FlexDiv>
}

const connectionState={
    NONE:'NONE',
    CONNECT_SUCCESS:'CONNECT_SUCCESS',
    CONNECT_FAIL:'CONNECT_FAIL',
}

const ExpandContent = compose(withSelectByClick, withExpand)(props => <Content {...props} />)

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = { connState: connectionState.NONE, dbs: [], isLoading: false, isExpand: true };

    }

    handleClick = () => {
        const { dispatch, item } = this.props;
        dispatch(connectionActions.selectConnection(item.name));
    }

    handleDoubleClick = () => {
        const { connState } = this.state;
        if (connState === connectionState.NONE) {
            this.setState({ isLoading: true });
            const { dispatch, item } = this.props;
            dispatch(dbActions.getDbList(item.name));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { connState } = this.state;
        if (connState === connectionState.NONE) {
            const { dbs, connection, item } = nextProps;
            if (dbs != null && connection === item.name) {
                this.setState({ connState: connectionState.CONNECT_SUCCESS, dbs, isLoading: false });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { item, selectedConnection,selectNodeType } = this.props;
        const { connState, isLoading, isExpand } = this.state;
        if (nextState != null) {
            if (nextState.connState !== connState) {
                return true;
            }
            if (nextState.isLoading !== isLoading) {
                return true;
            }

            if (nextState.isExpand !== isExpand) {
                return true;
            }
        }
        if (nextProps != null) {

            if (selectedConnection === item.name && nextProps.selectedNodeType !== nodeTypes.CONNECTION) {
                return true;
            }
            if (item.name === selectedConnection && nextProps.selectedConnection !== item.name) {
                return true;
            }
            if (item.name !== selectedConnection && nextProps.selectedConnection === item.name) {
                return true;
            }
            if(selectedConnection === item.name && nextProps.selectedNodeType !== selectNodeType){
                return true;
            }
        }

        return false;
    }

    handleExpand = isExpand => {
        this.setState({ isExpand });
    }

    
    render() {
        const { item, selectedConnection, selectedNodeType } = this.props;
        const { dbs, isLoading, isExpand ,connState} = this.state;
        console.log('render connection ' + item.name);
        const isSelected=selectedNodeType === nodeTypes.CONNECTION && selectedConnection === item.name;
        return <React.Fragment>
            {item && <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ connection: JSON.stringify(item) }}>
                <Li title={item.name} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent
                        handleClick={this.handleClick}
                        item={item}
                        isSelected={isSelected} 
                        connState={connState}
                        dbs={dbs} 
                        isLoading={isLoading}
                        handleExpand={this.handleExpand}
                        isExpand={isExpand}>
                        {dbs && dbs.length > 0 && dbs.map(x => <DB key={x} dbIdx={x} connectionName={item.name} isVisible={isExpand} />)}
                    </ExpandContent>

                </Li>
            </ContextMenuTrigger>}
          
        </React.Fragment>

    }
}

function mapStateToProps(state) {
    const { connections } = state.connection;
    const { dbs, connection } = state.db;
    const { selectedConnection, selectedNodeType } = state.state;
    return { connections, selectedConnection, dbs, connection, selectedNodeType };
}


const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }