import React, { Component } from 'react'
import { imgSrc } from '../imgSrc'
import { connect } from 'react-redux'
import {ToolbarButton,ButtonDiv,Seperator} from './part'
import {
    compositAddKeyCommand, compositRefreshCommand, compositOpenCommand,compositSaveCommand,
    compositDeleteCommand, compositModifyCommand,addConnectionCommand
} from '../commands'

 

class RedisToolbar extends Component {

    handleAddConnectionClick = () => addConnectionCommand({dispatch:this.props.dispatch}); 

    canRefresh = () => compositRefreshCommand(this.props).canExecute();

    /**
     * 刷新db或者connection
     */
    handleRefreshClick = () => compositRefreshCommand(this.props).execute();

    getSelectedDb = () => {
        const { selectedDbId, dbs } = this.props;
        if (selectedDbId == null) {
            return null;
        }
        return dbs.find(x => x.id === selectedDbId);
    }

    getSelectedKey = () => {
        const { keys, selectedKeyId } = this.props;
        return keys.find(x => x.id === selectedKeyId);
    }

    getSelectedConnection = () => {
        const { selectedConnectionId, connections } = this.props;
        return selectedConnectionId == null ? null : connections.find(x => x.id === selectedConnectionId);
    }

    canOpen = () => compositOpenCommand(this.props).canExecute();

    handleOpenClick = () => compositOpenCommand(this.props).execute();

    canAddRedisKey = () => compositAddKeyCommand(this.props).canExecute();

    handleAddKeyClick = () => compositAddKeyCommand(this.props).execute();

    canModifyConnection = () => compositModifyCommand(this.props).canExecute();

    handleModifyConnectionClick = () => compositModifyCommand(this.props).execute();

    canDelete = () => compositDeleteCommand(this.props).canExecute();

    handleDeleteClick = () => compositDeleteCommand(this.props).execute();

    canSaveKey = () => compositSaveCommand(this.props).canExecute();

    handleSaveKeyClick = () => compositSaveCommand(this.props).execute();

    render() {
        return <ButtonDiv>
            <ToolbarButton title='添加Redis服务器'  onClick={this.handleAddConnectionClick} height={'20px'} width={'20px'} backgroundImage={imgSrc.ADD_REDIS_CONNECTION_IMG}></ToolbarButton>
            <ToolbarButton title='添加Redis键' disabled={!this.canAddRedisKey()} onClick={this.handleAddKeyClick} height={'24px'} width={'20px'} backgroundImage={imgSrc.ADD_REDIS_KEY_IMG}></ToolbarButton>
            <ToolbarButton title='配置连接' disabled={!this.canModifyConnection()} onClick={this.handleModifyConnectionClick} height={'18px'} width={'18px'} backgroundImage={imgSrc.CONNECTION_CONFIG_IMG}></ToolbarButton>
            <Seperator />
            <ToolbarButton title='加载' disabled={!this.canOpen()} onClick={this.handleOpenClick} height={'18px'} width={'18px'} backgroundImage={imgSrc.CONNECT_IMG}></ToolbarButton>
            <ToolbarButton title='保存键设置(Ctrl+S)' disabled={!this.canSaveKey()} onClick={this.handleSaveKeyClick} height={'21px'} width={'21px'} backgroundImage={imgSrc.SAVE_IMG}></ToolbarButton>

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