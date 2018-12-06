import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { nodeTypes, contextMenuIds } from '../../constants'
import { connectionActions, keyActions, dbActions } from '../../actions'
import { ListView, IconList, ContextMenuTriggerRegists } from '../../controls'
import { DBIcon, KeyIcon, ConnectionIcon, ConnectionSuccessIcon } from '../icons'
import { ConnectionMenuTrigger, DbMenuTrigger, KeyMenuTrigger } from '../contextMenus'


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
        this.registItemIcon();
        this.registItemContextMenuTrigger();
    }

    registItemIcon = () => {
        const add = ({ key, icon }) => {
            if (IconList.find(x => x.key === key) == null) {
                IconList.push({ key, icon });
            }
        }
        add({ key: iconKeys.CONNECTION_DEFAULT_ICON, icon: ConnectionIcon });
        add({ key: iconKeys.CONNECTION_SUCCESS_ICON, icon: ConnectionSuccessIcon });
        add({ key: iconKeys.DB_ICON, icon: DBIcon });
        add({ key: iconKeys.KEY_ICON, icon: KeyIcon });
    }

    registItemContextMenuTrigger = () => {
        const add = ({ key, trigger }) => {
            if (ContextMenuTriggerRegists.find(x => x.key === key) == null) {
                ContextMenuTriggerRegists.push({ key, trigger });
            }
        }
        add({ key: contextMenuIds.CONNECTION_CONTEXTMENU_ID, trigger: ConnectionMenuTrigger });
    }

    getListViewItems = () => {
        const { selectedNodeType, connections, dbs, keys, selectedConnectionName, selectedKey, selectedDb, } = this.props;
        // console.log( { selectedNodeType, connections, dbs, keys, connectionOfDb, selectedConnection, selectedKey, selectedDB ,dbOfKey, connectionOfKey,} );
        switch (selectedNodeType) {
            case nodeTypes.ROOT:
                return connections.map(x => { return this.mapConnectionToItem(x) });
            case nodeTypes.CONNECTION:
                return dbs.map(x => { return this.mapDBToItem(x) });

            case nodeTypes.DB:
            case nodeTypes.KEY:
                return keys.map(x => { return this.mapKeyToItem(x) });
           
            default:
                return [];
        }
    }

    mapConnectionToItem = connection => {
        //格式必须包括listviewitem的所需数据和快捷菜单的数据
        return {
            iconId: iconKeys.CONNECTION_DEFAULT_ICON,
            title: connection.name,
            id: connection.name,
            onDoubleClick: this.handleConnectionNodeClick,
            isSmallIcon: true,
            contextMenuProps:{ 
                contextMenuTriggerId: contextMenuIds.CONNECTION_CONTEXTMENU_ID,
                connection:connection.name,
                isConnected:false,
            },
        }
    }

    mapDBToItem = dbIdx => {
        return {
            iconId: iconKeys.DB_ICON,
            title: `db${dbIdx}`,
            id: dbIdx,
            onDoubleClick: this.handleDbNodeClick,
            isSmallIcon: true,
        }
    }

    mapKeyToItem = key => {
        return {
            iconId: iconKeys.KEY_ICON,
            title: key.key,
            id: key.key,
            onDoubleClick: this.handleKeyNodeClick,
            isSmallIcon: true,
        }
    }

    handleConnectionNodeClick = connectionName => {
        const { dispatch } = this.props;
        dispatch(connectionActions.selectConnection(connectionName));
    }

    handleDbNodeClick = dbIdx => {
        const { dispatch, selectedConnectionName } = this.props;
        dispatch(dbActions.selectDB(selectedConnectionName, dbIdx));
    }

    handleKeyNodeClick = key => {
        alert(key);
    }

    render() {
        console.log('render listviewpane');
        const items = this.getListViewItems();

        return <Div>
            <ListView items={items} />
        </Div>
    }
}

const mapStateToProps = state => {

    return { ...state.state, ...state.connection, ...state.db, ...state.key };
}

const listView = connect(mapStateToProps)(ListViewTabPane)

export { listView as ListViewTabPane }