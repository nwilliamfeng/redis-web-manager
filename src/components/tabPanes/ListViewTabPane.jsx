import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { nodeTypes, contextMenuIds, connectionStates, dbStates } from '../../constants'
import { connectionActions, multiNodeAction, dbActions } from '../../actions'
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
        add({ key: contextMenuIds.DB_CONTEXTMENU_ID, trigger: DbMenuTrigger });
        add({ key: contextMenuIds.KEY_CONTEXTMENU_ID, trigger: KeyMenuTrigger });
    }

    getListViewItems = () => {
        const { selectedNodeType, connections, dbs, keys } = this.props;

        switch (selectedNodeType) {
            case nodeTypes.ROOT:
                return connections.map(x => { return this.mapConnectionToItem(x) });
            case nodeTypes.CONNECTION:
                return dbs.map(x => { return this.mapDBToItem(x) });
            case nodeTypes.DB:
                return keys.map(x => { return this.mapKeyToItem(x) });
            case nodeTypes.KEY:
                return keys.map(x => { return this.mapKeyToItem(x) });

            default:
                return [];
        }
    }

    mapConnectionToItem = connection => {
        //格式必须包括listviewitem的所需数据和快捷菜单的数据 
        return {
            iconId: connection.connectionState === connectionStates.CONNECTED ? iconKeys.CONNECTION_SUCCESS_ICON : iconKeys.CONNECTION_DEFAULT_ICON,
            title: connection.name,
            id: connection.name,
            onDoubleClick: this.handleConnectionNodeClick,
            isSmallIcon: true,
            contextMenuProps: {
                contextMenuTriggerId: contextMenuIds.CONNECTION_CONTEXTMENU_ID,
                connection: connection.name,
                isConnected: connection.connectionState === connectionStates.CONNECTED,
                dispatch: this.props.dispatch,
            },
        }
    }

    mapDBToItem = db => {
        return {
            iconId: iconKeys.DB_ICON,
            title: `db${db.dbIdx}`,
            id: db.id,
            onDoubleClick: this.handleDbNodeClick,
            isSmallIcon: true,
            contextMenuProps: {
                contextMenuTriggerId: contextMenuIds.DB_CONTEXTMENU_ID,
                connectionName: db.connectionName,
                dbId: db.id,
                dbIdx: db.dbIdx,
                isKeyLoaded: db.dbState === dbStates.KEY_LOAD_SUCCESS,
                dispatch: this.props.dispatch,
            },
        }
    }

    mapKeyToItem = key => {
        return {
            iconId: iconKeys.KEY_ICON,
            title: key.key,
            id: key.id,
            onDoubleClick: this.handleKeyNodeClick,
            isSmallIcon: true,
            contextMenuProps: {
                contextMenuTriggerId: contextMenuIds.KEY_CONTEXTMENU_ID,
                connection: key.connectionName,
                keyName: key.key,
                dbId: key.dbId,
                dbIdx: key.dbIdx,
                dispatch: this.props.dispatch,
            },
        }
    }

    handleConnectionNodeClick = connectionName => {
        const { dispatch } = this.props;
        dispatch(connectionActions.selectConnection(connectionName));
    }

    handleDbNodeClick = id => {
        const { dispatch, selectedConnectionId } = this.props;
        dispatch(dbActions.selectDB(selectedConnectionId, id));
    }

    handleKeyNodeClick = key => {
        alert(key);
    }

    handleSelectItemsChange = selectedItems => {
       const { dispatch,selectedNodeType } = this.props;
        if(selectedNodeType===nodeTypes.selectedItems || selectedNodeType===nodeTypes.DB){
            dispatch(multiNodeAction.multiSelect(selectedItems));     
        }
      
    }

    render() {
        console.log('render listviewpane');
        const items = this.getListViewItems();
        return <Div>
            <ListView items={items} onSelectItemsChange={this.handleSelectItemsChange}/>
        </Div>
    }
}

const mapStateToProps = state => {

    return { ...state.state, ...state.connection, ...state.db, ...state.key };
}

const listView = connect(mapStateToProps)(ListViewTabPane)

export { listView as ListViewTabPane }