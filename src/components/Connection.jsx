import React, { Component } from 'react'
import { Ul, Li, LiIcon, NameDiv, FlexDiv, FlexContainerDiv, LoadingImg } from './parts'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { connectionActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { withExpand } from '../controls'
import { DB } from './DB'


const Content = props => {
    const { dbs, item, isLoading } = props;
    return <FlexDiv>
        <FlexContainerDiv>
            <LiIcon src={require('../assets/imgs/connection.png')} />
            <NameDiv>{item.name}</NameDiv>
            {dbs && dbs.length > 0 && <div>{`[${dbs.length}项]`}</div>}
        </FlexContainerDiv>
        {isLoading === true && <LoadingImg />}
    </FlexDiv>
}

const ExpandContent = withExpand(props => <Content {...props} />)

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = { dbLoaded: false, dbs: [], isLoading: false };

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
        const { item, selectedName } = this.props;
        const { dbLoaded, isLoading } = this.state;
        if (nextState != null) {
            if (nextState.dbLoaded !== dbLoaded) {
                return true;
            }
            if (nextState.isLoading !== isLoading) {
                return true;
            }
        }
        if (nextProps != null) {
            if (item.name === selectedName && nextProps.selectedName !== item.name) {
                return true;
            }
            else if (item.name !== selectedName && nextProps.selectedName === item.name) {
                return true;
            }

            if (item.name === nextProps.connection) {
                return true;
            }
        }

        return false;
    }


    render() {
        const { item, selectedName } = this.props;
        const { dbs, isLoading } = this.state;
        console.log('render connection ' + item.name);
        return <React.Fragment>
            {item && <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
                <Li onClick={this.handleClick} title={item.name} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent item={item} isSelected={selectedName === item.name} dbs={dbs} isLoading={isLoading}>
                        {dbs && dbs.length > 0 && dbs.map(x => <DB key={x} dbIdx={x} />)}
                    </ExpandContent>

                </Li>
            </ContextMenuTrigger>}
        </React.Fragment>

    }
}

function mapStateToProps(state) {
    const { connections, selectedName } = state.connection;
    const { dbs, connection } = state.db;
    return { connections, selectedName, dbs, connection };
}


const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }