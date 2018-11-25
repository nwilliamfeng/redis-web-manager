import React, { Component } from 'react'
import { Ul, Li, LiIcon, NameDiv, FlexDiv } from './parts'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { connectionActions,dbActions } from '../actions'
import { connect } from 'react-redux'
import { withExpand } from '../controls'


const Content = props => <FlexDiv>
    <LiIcon src={require('../assets/imgs/connection.png')} />
    <NameDiv>{props.item.name}</NameDiv>
</FlexDiv>

const ExpandContent = withExpand(props => <Content {...props}/>)

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = { dbLoaded: false,dbs:[] };
    }

    handleClick = () => {
        const { dispatch, item } = this.props;
        dispatch(connectionActions.selectConnection(item.name));
    }

    handleDoubleClick = () => {
        const {dbLoaded} =this.state;
        if(dbLoaded===false){
            const { dispatch,item } = this.props;
            dispatch(dbActions.getDbList(item.name));
            this.setState({dbLoaded:true});
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { item, selectedName,dbs } = this.props;
        console.log('do render...' );
        const {dbLoaded}=this.state;
        if(nextState!=null && nextState.dbLoaded!==dbLoaded){
            return true;
        }
        if (nextProps != null) {
            if (item.name === selectedName && nextProps.selectedName !== item.name) {
                return true;
            }
            else if (item.name !== selectedName && nextProps.selectedName === item.name) {
                return true;
            }

            if( item.name===nextProps.connection){
                return true;
            }
        }

        return false;
    }


    render() {
        const { item, selectedName,dbs } = this.props;
        console.log('render connection ' + item.name);
        console.log(dbs);
        return <React.Fragment>
            {item && <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
                <Li onClick={this.handleClick} title={item.name} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent item={item} isSelected={selectedName === item.name} >
                         {dbs && dbs.length>0 && dbs.map(x=><div>{x}</div>)
                           
                        }
                    </ExpandContent>

                </Li>
            </ContextMenuTrigger>}
        </React.Fragment>

    }
}

function mapStateToProps(state) {
    const  {connections, selectedName}= state.connection;
    const {dbs,connection} =state.db;
    return {connections,selectedName,dbs,connection};
}


const connection = connect(mapStateToProps)(Connection)

export { connection as Connection }