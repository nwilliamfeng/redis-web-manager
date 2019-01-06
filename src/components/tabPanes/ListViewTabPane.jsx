import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { nodeTypes, contextMenuIds, connectionStates, dbStates } from '../../constants'
import { connectionActions, multiNodeAction, dbActions, keyActions } from '../../actions'
import { ListView, IconList, ContextMenuTriggerRegists } from '../../controls'
import { DBIcon, KeyIcon, ConnectionIcon, ConnectionSuccessIcon } from '../icons'
import { ConnectionMenuTrigger, DbMenuTrigger, KeyMenuTrigger } from '../contextMenus'
import { commandHelper} from '../commands'
import { imgSrc } from '../imgSrc'

const Div = styled.div`
    width:100%;
    height:100%;
    padding:1px;
    padding-bottom:2px;
    display:flex;
    flex-direction:column;
`
const Footer = styled.div`
    justify-content:flex-end;
    align-items:center;
    display:flex;
    color:gray;
    padding:3px;
    font-size:12px;
    padding-bottom:0px;
`

const ToggleDiv = styled.div`
    display:flex;
    justify-items:center;
    align-items:center;
    width:22px;
    height:22px;
    background:${props => props.isSelected === true ? '#87CEFA' : 'transparent'};
    border:${props => props.isSelected === true ? '1px solid #00BFFF' : '1px solid transparent'};
    &:hover{
        background:#87CEFA;
        border:1px solid #00BFFF;
    }
    background-repeat:no-repeat;
    background-size:100%; 
    
`
const ToggleImg = styled.img`
    width:22px;
    height:22px;
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
        this.state = { isSmallIcon: true };
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
                return [];

            default:
                return [];
        }
    }

    mapConnectionToItem = connection => {
        const {isSmallIcon}=this.state;
        //格式必须包括listviewitem的所需数据和快捷菜单的数据 
        return {
            iconId: connection.connectionState === connectionStates.CONNECTED ? iconKeys.CONNECTION_SUCCESS_ICON : iconKeys.CONNECTION_DEFAULT_ICON,
            title: connection.name,
            id: connection.name,
            onDoubleClick: this.handleConnectionNodeClick,
            isSmallIcon,
            contextMenuProps: {
                contextMenuTriggerId: contextMenuIds.CONNECTION_CONTEXTMENU_ID,
                connection: connection.name,
                data: connection,
                isConnected: connection.connectionState === connectionStates.CONNECTED,
                dispatch: this.props.dispatch,
            },
        }
    }

    mapDBToItem = db => {
        const {isSmallIcon}=this.state;
        return {
            iconId: iconKeys.DB_ICON,
            title: `db${db.dbIdx}`,
            id: db.id,
            onDoubleClick: this.handleDbNodeClick,
            isSmallIcon,
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
      
        const {isSmallIcon}=this.state;
     
        return {
            iconId: iconKeys.KEY_ICON,
            title: key.key,
            id: key.id,
            onDoubleClick: this.handleKeyNodeClick,
            isSmallIcon,
            contextMenuProps: {
                contextMenuTriggerId: contextMenuIds.KEY_CONTEXTMENU_ID,
                connectionName: key.connectionName,
                keyName: key.key,
                keyType: key.type,
                dbId: key.dbId,
                dbIdx: key.dbIdx,
                dispatch: this.props.dispatch,
                redisKey:key,
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
        const { dispatch } = this.props;
        const rk =commandHelper.getKey(this.props,key);     
      dispatch(keyActions.selectKey(rk));
    }

    handleSelectItemsChange = selectedItems => {
        const { dispatch, selectedNodeType } = this.props;
        if (selectedNodeType === nodeTypes.CONNECTION || selectedNodeType === nodeTypes.DB) {
            dispatch(multiNodeAction.multiSelect(selectedItems));
        }
    }

    handleSmallIconToggleClick = () =>  this.setState({ isSmallIcon: true })

    handleLargeIconToggleClick = () =>  this.setState({ isSmallIcon: false })

    render() {
        console.log('render listviewpane');
        const items = this.getListViewItems();
        const { isSmallIcon } = this.state;
        return <Div>
            <ListView items={items} onSelectItemsChange={this.handleSelectItemsChange} style={{ height: '100%' }} />
            <Footer>
                {`共 ${items.length} 项`}
                <ToggleDiv title='列表显示' style={{ marginLeft: 10 }} isSelected={isSmallIcon === true} onClick={this.handleSmallIconToggleClick}>
                    <ToggleImg src={imgSrc.LIST_IMG} />
                </ToggleDiv>
                <ToggleDiv title='图标显示' isSelected={isSmallIcon === false} onClick={this.handleLargeIconToggleClick}>
                    <ToggleImg src={imgSrc.ICON_IMG} />
                </ToggleDiv>
            </Footer>
        </Div>
    }
}

const mapStateToProps = state => {
    return { ...state.state, ...state.connection, ...state.db, ...state.key };
}

const listView = connect(mapStateToProps)(ListViewTabPane)

export { listView as ListViewTabPane }