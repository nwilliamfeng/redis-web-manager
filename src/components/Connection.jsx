import React, { Component } from 'react'
import { Li, NameDiv, FlexDiv, FlexContainerDiv, LoadingImg } from '../controls/parts'
import { connectionActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { nodeTypes } from '../constants'
import { withExpand, withSelectByClick } from '../controls'
import { compose } from 'recompose'
import { DB } from './DB'
import { ConnectionIcon, ConnectionSuccessIcon } from './icons'
import { ConnectionMenuTrigger} from './contextMenus'

const Content = props => {
    const { dbs, item, isLoading, isConnected } = props;
    return <FlexDiv>
        <FlexContainerDiv >
            {isConnected===false && <ConnectionIcon />}
            {isConnected === true && <ConnectionSuccessIcon />}

            <NameDiv>{item.name}</NameDiv>
            {dbs && dbs.length > 0 && <div>{`[${dbs.length}项]`}</div>}
        </FlexContainerDiv>
        <div>{isLoading === true && <LoadingImg />}</div>
    </FlexDiv>
}

const ExpandContent = compose(withSelectByClick, withExpand)(props => <Content {...props} />)

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = {isConnected:false, dbs: [], isLoading: false, isExpand: true };

    }

    handleClick = () => {
        const { dispatch, item ,selectedConnectionName,selectedNodeType} = this.props;
        if(selectedConnectionName!==item.name || selectedNodeType!==nodeTypes.CONNECTION){
            dispatch(connectionActions.selectConnection(item.name));
        }
       
    }

    handleDoubleClick = () => {     
        if (!this.isConnected()) {
            this.setState({ isLoading: true });
            const { dispatch, item } = this.props;
            dispatch(dbActions.getDbList(item.name));
        }
    }

    isConnected=()=>{
        const {isConnected} =this.state;
        return isConnected===true;
    }

    componentWillReceiveProps(nextProps, nextContext) {
      
        if (!this.isConnected() && this.state.isLoading===true) {
            const { dbs, selectedConnectionName, item } = nextProps;
            if (dbs != null && selectedConnectionName === item.name) {
                this.setState({ dbs, isLoading: false ,isConnected:true});
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { item, selectedConnectionName, selectNodeType } = this.props;
        const {  isLoading, isExpand,isConnected } = this.state;
        if (nextState != null) {
          
            if(isConnected!==nextState.isConnected){
                return true;
            }
            if (nextState.isLoading !== isLoading) {
                return true;
            }

            if (nextState.isExpand !== isExpand) {
                return true;
            }
        }
        if (nextProps != null) {
          
            if (selectedConnectionName === item.name && nextProps.selectedNodeType !== nodeTypes.CONNECTION) {
                return true;
            }
            if (item.name === selectedConnectionName && nextProps.selectedConnectionName !== item.name) {
                return true;
            }
            if (item.name !== selectedConnectionName && nextProps.selectedConnectionName === item.name) {
                return true;
            }
            if (selectedConnectionName === item.name && nextProps.selectedNodeType !== selectNodeType) {
                return true;
            }
        }

        return false;
    }

    handleExpand = isExpand => {
        this.setState({ isExpand });
    }

    render() {
        const { item, selectedConnectionName, selectedNodeType,dispatch } = this.props;
        const { dbs, isLoading, isExpand } = this.state;
        console.log('render connection ' + item.name);
        const isConnected=this.isConnected();
        const isSelected = selectedNodeType === nodeTypes.CONNECTION && selectedConnectionName === item.name;
        return <React.Fragment>
            {item && <ConnectionMenuTrigger  connection={item} dispatch={dispatch} isConnected={isConnected} >
                <Li title={item.name} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent
                        handleClick={this.handleClick}
                        item={item}
                        isSelected={isSelected}
                        isConnected={isConnected}
                        dbs={dbs}
                        isLoading={isLoading}
                        handleExpand={this.handleExpand}
                        isExpand={isExpand}>
                        {dbs && dbs.length > 0 && dbs.map(x => <DB key={x} dbIdx={x} connectionName={item.name} isVisible={isExpand} />)}
                    </ExpandContent>
                </Li>
            </ConnectionMenuTrigger>}

        </React.Fragment>

    }
}

function mapStateToProps(state) {
    const { connections,selectedConnectionName } = state.connection;
    const { dbs } = state.db;
    const {  selectedNodeType } = state.state;
    return { connections,  dbs, selectedConnectionName, selectedNodeType };
}


const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }