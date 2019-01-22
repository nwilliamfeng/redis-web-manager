import React, { Component } from 'react'
import { SelectableLi, NameDiv, FlexDiv, FlexContainerDiv, LoadingImg } from '../controls/parts'
import { connectionActions } from '../actions'
import { connect } from 'react-redux'
import { nodeTypes, connectionStates } from '../constants'
import { withExpand } from '../controls'
import { DB } from './DB'
import { ConnectionIcon, ConnectionSuccessIcon, } from './icons'
import { ConnectionMenuTrigger } from './contextMenus'
import { isEqual } from 'lodash'

const Content = ({ dbs, item, isLoading, isConnected }) => {

    return <FlexDiv>
        <FlexContainerDiv >
            {isConnected === false && <ConnectionIcon />}
            {isConnected === true && <ConnectionSuccessIcon />}
            <NameDiv>{item.name}</NameDiv>
            {dbs && dbs.length > 0 && <div>{`[${dbs.length}项]`}</div>}
        </FlexContainerDiv>
        <div>{isLoading === true && <LoadingImg />}</div>
    </FlexDiv>
}


const LiContent = withExpand(props => <Content {...props} />)


class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = { dbs: [] };
    }

    handleClick = () => {
        const { dispatch, item, selectedConnectionId, selectedNodeType } = this.props;
        if (selectedConnectionId !== item.name || selectedNodeType !== nodeTypes.CONNECTION) {
            dispatch(connectionActions.selectConnection(item.name));
        }
    }

    handleDoubleClick = () => {
        if (!this.isConnected()) {
            const { dispatch, item } = this.props;
            dispatch(connectionActions.getDbList(item.name));
        }
        else {
            this.handleExpand(!this.props.item.isExpand);
        }
    }

    isConnected = () => {
        const { connectionState } = this.props.item;
        return connectionState === connectionStates.CONNECTED;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { id } = this.props.item;
        if (nextProps.item.connectionState === connectionStates.CONNECTED) {
            const { dbs, selectedConnectionId } = nextProps;  //如果是连接成功了则缓存db集合，并且折叠展开
            if (dbs != null && selectedConnectionId === id) {
                this.setState({ dbs });
            }
        }
        else if (nextProps.item.connectionState === connectionStates.NONE) {
            this.setState({ dbs: [] });//如果是重连失败的话，则清空
        }

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps == null) {
            return false;
        }
        if (this.props.selectedConnectionId === this.props.item.id) {
            if (!isEqual(this.props.dbs, nextProps.dbs)) { //检查dbs的状态是否变化，比如刷新键
                return true;
            }
        }
        const { item, selectedConnectionId, selectNodeType } = this.props;

        if (nextProps.item.isExpand !== item.isExpand) {
            return true;
        }
        if (nextProps.item.connectionState !== item.connectionState) {
            return true;
        }

        if (selectedConnectionId === item.id && nextProps.selectedNodeType !== nodeTypes.CONNECTION) {
            return true;
        }
        if (item.name === selectedConnectionId && nextProps.selectedConnectionId !== item.name) {
            return true;
        }
        if (item.name !== selectedConnectionId && nextProps.selectedConnectionId === item.name) {
            return true;
        }
        if (selectedConnectionId === item.name && nextProps.selectedNodeType !== selectNodeType) {
            return true;
        }

        return false;
    }

    handleExpand = isExpand => {
        const { item, dispatch } = this.props;
        dispatch(connectionActions.updateSelectExpandState(item.id, isExpand));
    }

    render() {
        const { item, selectedConnectionId, selectedNodeType, dispatch } = this.props;
        const { dbs } = this.state;

        console.log('render connection ' + item.name);
        const isConnected = this.isConnected();
        const isSelected = selectedNodeType === nodeTypes.CONNECTION && selectedConnectionId === item.name;
        return <React.Fragment>
            {item && <ConnectionMenuTrigger connection={item.name} dispatch={dispatch} isConnected={isConnected} data={item} >
                <SelectableLi title={item.name}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                    isSelected={isSelected}>
                    <LiContent
                        dbs={dbs} 
                        item={item}
                        isExpand={item.isExpand}
                        handleExpand={this.handleExpand}
                        hasChilds={dbs.length > 0}
                        isLoading={item.connectionState === connectionStates.CONNECTING}
                        isConnected={isConnected} />                  
                </SelectableLi>
                {dbs && dbs.length > 0
                    && dbs.map(x => <DB key={x.id} id={x.id} dbIdx={x.dbIdx} isExpand={x.isExpand} dbState={x.dbState} connectionName={item.name} isVisible={item.isExpand} />)}
            </ConnectionMenuTrigger>}

        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const { connections, selectedConnectionId } = state.connection;
    const { dbs } = state.db;
    const { selectedNodeType } = state.state;
    return { connections, dbs, selectedConnectionId, selectedNodeType };
}

const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }