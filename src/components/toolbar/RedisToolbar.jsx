import React, { Component } from 'react'
import styled from 'styled-components'
import { dbStates, connectionStates } from '../../constants'
import { imgSrc } from '../imgSrc'
import { Button } from '../../controls'
import { connect } from 'react-redux'
import { addKeyCommand, refreshConnectionCommand, refreshDbCommand, openConnectionCommand } from '../commands'


const ButtonDiv = styled.div`
    flex:0 1 100%;
    height:100%;
    margin-left:5px;
    align-items:center;
    justify-content:left;
    text-align:left;
    display:flex;
`

const ToolbarButton = styled(Button)`
    height:${props => props.height ? props.height : '24px'};
    width:${props => props.width ? props.width : '24px'};
    background-image:${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
    background-repeat:no-repeat;
    margin-right:8px;
    background-size:100%;
 `

class RedisToolbar extends Component {

    handleAddConnectionClick = () => {
        console.log(this.props);
    }

    handleAddKeyClick = () => {
        const { dispatch } = this.props;
        const db = this.getSelectedDb();
        addKeyCommand({ dispatch, dbIdx: db.dbIdx, connectionName: db.connectionName, dbId: db.id });
    }

    /**
     * 刷新db或者connection
     */
    handleRefreshClick = () => {
        const { dispatch, selectedDbId, selectedConnectionId } = this.props;
        if (selectedDbId != null) {
            const db = this.getSelectedDb();
            refreshDbCommand({ dispatch, dbIdx: db.dbIdx, connectionName: db.connectionName, dbId: db.id });
        }
        else {
            refreshConnectionCommand({ dispatch, connectionId: selectedConnectionId });
        }
    }

    handleOpenClick = () => {
        const { dispatch, selectedDbId, selectedConnectionId } = this.props;
        if (selectedDbId != null) {
            const db = this.getSelectedDb();
            refreshDbCommand({ dispatch, dbIdx: db.dbIdx, connectionName: db.connectionName, dbId: db.id });
        }
        else {
            openConnectionCommand({ dispatch, connectionId: selectedConnectionId });
        }
    }

    getSelectedDb = () => {
        const { selectedDbId, dbs } = this.props;
        if (selectedDbId == null) {
            return null;
        }
        return dbs.find(x => x.id === selectedDbId);
    }

    getSelectedConnection = () => {
        const { selectedConnectionId, connections } = this.props;
        return selectedConnectionId == null ? null : connections.find(x => x.id === selectedConnectionId);
    }

    canOpen = () => {
        const { selectedConnectionId, selectedDbId } = this.props;
        if (selectedConnectionId == null) {
            return false;
        }
        if (selectedDbId != null) {
            return this.getSelectedDb().dbState === dbStates.NONE;
        }
        else {
            const conn = this.getSelectedConnection();
            return conn == null ? false : conn.connectionState === connectionStates.NONE;
        }

    }

    canAddRedisKey = () => {
        const { selectedDbId } = this.props;
        if (selectedDbId == null) {
            return false;
        }
        const db = this.getSelectedDb();
        return db == null ? false : db.dbState === dbStates.KEY_LOAD_SUCCESS;
    }

    canRefresh = () => {
        const { selectedDbId, selectedConnectionId } = this.props;
        if (selectedDbId == null && selectedConnectionId == null) {
            return false;
        }
        if (selectedDbId != null) {
            return this.getSelectedDb().dbState === dbStates.KEY_LOAD_SUCCESS;
        }
        return this.getSelectedConnection().connectionState === connectionStates.CONNECTED;
    }

    canDelete=()=>{
        const { selectedKeyId, selectedConnectionId } = this.props;
        return selectedKeyId != null || selectedConnectionId != null;
    }

    handleDeleteClick=()=>{
        const { selectedKeyId, selectedConnectionId } = this.props;
        if(selectedKeyId!==null) {
           
        }
    }


    render() {
        return <ButtonDiv>

            <ToolbarButton title='添加Redis服务器' disabled={true} onClick={this.handleAddConnectionClick} height={'18px'} width={'18px'} backgroundImage={imgSrc.ADD_REDIS_CONNECTION_IMG}></ToolbarButton>
            <ToolbarButton title='添加Redis键' disabled={!this.canAddRedisKey()} onClick={this.handleAddKeyClick} height={'24px'} width={'20px'} backgroundImage={imgSrc.ADD_REDIS_KEY_IMG}></ToolbarButton>
            <ToolbarButton title='激活' disabled={!this.canOpen()} onClick={this.handleOpenClick} height={'18px'} width={'18px'} backgroundImage={imgSrc.CONNECT_IMG}></ToolbarButton>

            <ToolbarButton title='刷新' disabled={!this.canRefresh()} onClick={this.handleRefreshClick} height={'22px'} width={'22px'} backgroundImage={imgSrc.REFRESH_IMG}></ToolbarButton>
            <ToolbarButton title='删除' disabled={!this.canDelete()} onClick={this.handleDeleteClick} height={'28px'} width={'28px'} backgroundImage={imgSrc.DELETE_IMG}></ToolbarButton>
        </ButtonDiv>

    }
}


const mapStateToProps = state => {
    return { ...state.key, ...state.db, ...state.connection, ...state.state };
}

const toolbar = connect(mapStateToProps)(RedisToolbar)

export { toolbar as RedisToolbar }