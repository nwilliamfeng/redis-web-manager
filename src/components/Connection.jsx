import React, { Component } from 'react'
import { Li, NameDiv, FlexDiv, FlexContainerDiv, LoadingImg } from '../controls/parts'
import { connectionActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { nodeTypes,connectionStates } from '../constants'
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
        console.log('create connection');
        super(props);
        this.state = { dbs: [],  isExpand: true };

    }

    handleClick = () => {
        const { dispatch, item ,selectedConnectionId,selectedNodeType} = this.props;
        if(selectedConnectionId!==item.name || selectedNodeType!==nodeTypes.CONNECTION){
            dispatch(connectionActions.selectConnection(item.name));
        }
       
    }

    handleDoubleClick = () => {     
        if (!this.isConnected()) {
            const { dispatch, item } = this.props;
           
            dispatch(connectionActions.getDbList(item.name));
        }
    }

    isConnected=()=>{
        const {connectionState} =this.props.item;
        return connectionState=== connectionStates.CONNECTED ||connectionState=== connectionStates.FAIL ;
    }

    componentWillReceiveProps(nextProps, nextContext) {
      
        const {id} =this.props.item;
 
        if ( this.props.item.connectionState===connectionStates.CONNECTED ) {
            const { dbs, selectedConnectionId } = nextProps;
            if (dbs != null && selectedConnectionId === id) {
                console.log('do set dbs '+id);
                console.log(dbs);
                console.log(selectedConnectionId);
                this.setState({ dbs});
            }
        }
       
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { item, selectedConnectionId, selectNodeType } = this.props;
        const { isExpand } = this.state;
        if (nextState != null) {
          

            if (nextState.isExpand !== isExpand) {
                return true;
            }
        }
        if (nextProps != null) {
            if ( nextProps.item.connectionState !==item.connectionState) {
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
        }

        return false;
    }

    handleExpand = isExpand => {
        this.setState({ isExpand });
    }

    render() {
        const {  item, selectedConnectionId, selectedNodeType,dispatch } = this.props;
        const {dbs ,isExpand } = this.state;
     //   console.log(dbs);
        console.log('render connection ' + item.name);
        const isConnected=this.isConnected();
        const isSelected = selectedNodeType === nodeTypes.CONNECTION && selectedConnectionId === item.name;
        return <React.Fragment>
            {item && <ConnectionMenuTrigger  connection={item.name} dispatch={dispatch} isConnected={isConnected} >
                <Li title={item.name} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent
                        handleClick={this.handleClick}
                        item={item}
                        isSelected={isSelected}
                        isConnected={isConnected}
                        dbs={dbs}
                        isLoading={item.connectionState===connectionStates.CONNECTING}
                        handleExpand={this.handleExpand}
                        isExpand={isExpand}>
                        {dbs && dbs.length > 0 && dbs.map(x => <DB key={x.id} id={x.id} dbIdx={x.dbIdx} connectionName={item.name} isVisible={isExpand} />)}
                    </ExpandContent>
                </Li>
            </ConnectionMenuTrigger>}

        </React.Fragment>

    }
}

function mapStateToProps(state) {
    const { connections,selectedConnectionId } = state.connection;
    const { dbs } = state.db;
    const {  selectedNodeType } = state.state;
    return { connections,  dbs, selectedConnectionId, selectedNodeType };
}


const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }