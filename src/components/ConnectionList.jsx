import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { connectionActions } from '../actions'
import { ContextMenu, MenuItem } from "react-contextmenu"
import {Connection} from './Connection'
import {Ul,Li} from '../controls/parts'
import {contextMenuIds} from './contextMenuIds'


 

const ConnectionContextMenu = ({ dispatch }) => {
    const handleConnectClick = (e, data, target) => {
        alert('abc');
    }
    return <ContextMenu id={contextMenuIds.CONNECTION_CONTEXTMENU_ID}>
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
        console.log('render connection-list');
        const { connections, dispatch } = this.props;

        return <React.Fragment>
            {connections &&
                <Ul>
                    {connections.map(x => <Connection key={x.name} item={x}/>)}
                </Ul>}
            <ConnectionContextMenu dispatch={dispatch} contextMenuId={contextMenuIds.CONNECTION_CONTEXTMENU_ID}/>
        </React.Fragment>
    }
}


const mapStateToProps = state => {
    const { connections } = state.connection;
    return { connections };
}

const list = connect(mapStateToProps)(ConnectionList)

export { list as ConnectionList }


