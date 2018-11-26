import React, { Component } from 'react'
import { Li, LiIcon, NameDiv, FlexDiv, FlexContainerDiv, LoadingImg } from './parts'
import {  ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { connectionActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import {selectNodeType} from '../constants'
import { withExpand ,withSelectByClick} from '../controls'
import { DB } from './DB'


const Content = props => {
    const { dbs, item, isLoading ,handleClick} = props;
    return <FlexDiv>
        <FlexContainerDiv onClick={handleClick}>
            <LiIcon src={require('../assets/imgs/connection.png')} />
            <NameDiv>{item.name}</NameDiv>
            {dbs && dbs.length > 0 && <div>{`[${dbs.length}项]`}</div>}
        </FlexContainerDiv>
        {isLoading === true && <LoadingImg />}
    </FlexDiv>
}

const ExpandContent =withSelectByClick( withExpand(props => <Content {...props} />))

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = { dbLoaded: false, dbs: [], isLoading: false,isExpand:true };
        
    }

    handleClick = () => {
        const { dispatch, item } = this.props;
        dispatch(connectionActions.selectConnection(item.name));
    }

    handleDoubleClick = () => {
        const { dbLoaded } = this.state;
        if (dbLoaded === false) {
            this.setState({ isLoading: true });
            const { dispatch, item } = this.props;
            dispatch(dbActions.getDbList(item.name));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { dbLoaded } = this.state;
        if (dbLoaded === false) {
            const { dbs, connection, item } = nextProps;
            if (dbs != null && connection === item.name) {
                this.setState({ dbLoaded: true, dbs, isLoading: false });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { item, selectedConnection } = this.props;
        const { dbLoaded, isLoading,isExpand } = this.state;
        if (nextState != null) {
            if (nextState.dbLoaded !== dbLoaded) {
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
            if (item.name === selectedConnection && nextProps.selectedConnection !== item.name) {
                return true;
            }
            else if (item.name !== selectedConnection && nextProps.selectedConnection === item.name) {
                return true;
            }
            if (item.name === nextProps.connection) {
                return true;
            }
        }

        return false;
    }

    handleExpand=isExpand=>{
        this.setState({isExpand});
    }


    render() {
        const { item, selectedConnection } = this.props;
        const { dbs, isLoading ,isExpand} = this.state;
        console.log('render connection ' + item.name);
        return <React.Fragment>
            {item && <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
                <Li   title={item.name} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent handleClick={this.handleClick} item={item} isSelected={selectedConnection === item.name} dbs={dbs} isLoading={isLoading}
                     handleExpand={this.handleExpand} isExpand={isExpand}>
                        {dbs && dbs.length > 0 && dbs.map(x => <DB key={x} dbIdx={x} connectionName={item.name} isVisible={isExpand}/>)}
                    </ExpandContent>

                </Li>
            </ContextMenuTrigger>}
        </React.Fragment>

    }
}

function mapStateToProps(state) {  
    const { connections } = state.connection;
    const { dbs, connection } = state.db;
    const {selectedConnection,selectedNodeType} =state.state;
    return selectedNodeType===selectNodeType.SELECT_CONNECTION? { connections, selectedConnection, dbs, connection } :{ connections, dbs, connection };
}


const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }