import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { connectionActions } from '../actions'
import { ContextMenu, MenuItem } from "react-contextmenu"
import {Connection} from './Connection'
import {Ul,Li} from './Ul'

const CONNECTION_CONTEXTMENU_ID = 'Connection_CONTEXTMENU_ID'

 

const ConnectionContextMenu = ({ dispatch }) => {
    const handleConnectClick = (e, data, target) => {
        alert('abc');
    }
    return <ContextMenu id={CONNECTION_CONTEXTMENU_ID}>
        <MenuItem onClick={handleConnectClick}>连接</MenuItem>
    </ContextMenu>
}

class ConnectionList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(connectionActions.loadConnectionList());
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }


    render() {
        const { connections, dispatch } = this.props;

        return <React.Fragment>
            {connections &&
                <Ul>
                    {connections.map(x => <Li>{x.name}</Li>)}
                </Ul>}
            <ConnectionContextMenu dispatch={dispatch} contextMenuId={CONNECTION_CONTEXTMENU_ID} />
        </React.Fragment>
    }
}


const mapStateToProps = state => {
    const { connections } = state.connection;
    return { connections };
}

const list = connect(mapStateToProps)(ConnectionList)

export { list as ConnectionList }


