import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { nodeTypes } from '../../constants'
import { connectionActions, keyActions, dbActions } from '../../actions'
import { ListView, ListViewIcons } from '../../controls'
import { DBIcon, KeyIcon, ConnectionIcon, ConnectionSuccessIcon } from '../icons'

const Div = styled.div`
    width:100%;
    height:100%;
    padding:1px;
    padding-bottom:2px;
`
const iconKeys = {
    CONNECTION_DEFAULT_ICON: 'CONNECTION_DEFAULT_ICON',
    CONNECTION_SUCCESS_ICON: 'CONNECTION_SUCCESS_ICON',
    CONNECTION_FAIL_ICON: 'CONNECTION_FAIL_ICON',
    DB_ICON: 'DB_ICON',
    KEY_ICON: 'KEY_ICON',
}

// { iconId: 'CONNECTION_SUCCESS_ICON', title: 'ab56346345634563456345643563462', id: 'abcd' }

class ListViewTabPane extends Component {

    constructor(props) {
        super(props);
        this.registListViewIcons();
    }

    registListViewIcons = () => {
        const add = ({ key, icon }) => {
            if (ListViewIcons.find(x => x.key === key) == null) {
                ListViewIcons.push({ key, icon });
            }
        }
        add({ key: iconKeys.CONNECTION_DEFAULT_ICON, icon: ConnectionIcon });
        add({ key: iconKeys.CONNECTION_SUCCESS_ICON, icon: ConnectionSuccessIcon });
        add({ key: iconKeys.DB_ICON, icon: DBIcon });
        add({ key: iconKeys.KEY_ICON, icon: KeyIcon });
    }

    getListViewItems = () => {
        const { selectedNodeType, selectedConnection, selectedDB, selectedKey, connections, dbs } = this.props;
        switch (selectedNodeType) {
            case nodeTypes.ROOT:
                return connections.map(x => { return this.mapConnectionToItem(x) });
            case nodeTypes.CONNECTION:
                return dbs.map(x => { return this.mapDBToItem(x) });
                break;
            case nodeTypes.DB:
                return dbs.map(x => { return this.mapKeyToItem(x) });
                break;
            default:
                return [];
        }
    }

    mapConnectionToItem = connection => {
        return {
            iconId: iconKeys.CONNECTION_DEFAULT_ICON,
            title: connection.name,
            id: connection.name,
            onDoubleClick: this.handleConnectionNodeClick,
        }
    }

    mapDBToItem = dbIdx => {
        return {
            iconId: iconKeys.DB_ICON,
            title: `db${dbIdx}`,
            id: dbIdx,
            onDoubleClick: this.handleDbNodeClick,
        }
    }

    mapKeyToItem = key => {
        return {
            iconId: iconKeys.KEY_ICON,
            title: key,
            id: key,
            onDoubleClick: this.handleKeyNodeClick,
        }
    }

    handleConnectionNodeClick = connectionName => {
        const { dispatch } = this.props;
        dispatch(connectionActions.selectConnection(connectionName));
    }

    handleDbNodeClick = dbIdx => {
        const { dispatch, selectedConnection } = this.props;
        dispatch(dbActions.selectDB(selectedConnection, dbIdx));
    }

    handleKeyNodeClick = key => {
        alert(key);
    }

    render() {
        // console.log('render listviewpane');
        //console.log(this.props);
        const items = this.getListViewItems();
        return <Div>
            
            <ListView items={items} />

        </Div>
    }
}

const mapStateToProps = state => {
    return { ...state.state, ...state.connection, ...state.db };
}

const listView = connect(mapStateToProps)(ListViewTabPane)

export { listView as ListViewTabPane }