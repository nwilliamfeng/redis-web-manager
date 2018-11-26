import React, { Component } from 'react'
import { Ul, Li, LiIcon, NameDiv, FlexDiv, EmptyDiv } from './parts'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { connectionActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { withExpand } from '../controls'


const Content = props => <FlexDiv>
    <EmptyDiv/>
    <LiIcon src={require('../assets/imgs/db.png')} />
    <NameDiv>{props.name}</NameDiv>
    {/* {props.dbs && props.dbs.length>0 && <div>{`[${props.dbs.length}项]`}</div>} */}
</FlexDiv>

const ExpandContent = withExpand(props => <Content {...props} />)

class DB extends Component {

    constructor(props) {
        super(props);
        this.state = { keyLoaded: false, keys: [] };

    }

    handleClick = () => {
        // const { dispatch, item } = this.props;
        // dispatch(connectionActions.selectConnection(item.name));
    }

    handleDoubleClick = () => {
        // const {dbLoaded} =this.state;
        // if(dbLoaded===false){
        //     const { dispatch,item } = this.props;
        //     dispatch(dbActions.getDbList(item.name));
        // }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // const {dbLoaded} =this.state;
        // if(dbLoaded===false){
        //     const {dbs,connection,item}=nextProps;
        //     if(dbs!=null && connection===item.name){
        //         console.log('set dbs '+item.name);
        //         this.setState({dbLoaded:true,dbs});
        //     }
        // }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
        // const { item, selectedName } = this.props;
        // const {dbLoaded}=this.state;
        // if(nextState!=null && nextState.dbLoaded!==dbLoaded){
        //     console.log('check dbloaded '+item.name);
        //     return true;
        // }
        // if (nextProps != null) {
        //     if (item.name === selectedName && nextProps.selectedName !== item.name) {
        //         return true;
        //     }
        //     else if (item.name !== selectedName && nextProps.selectedName === item.name) {
        //         return true;
        //     }

        //     if( item.name===nextProps.connection){
        //         return true;
        //     }
        // }

        return false;
    }


    render() {
        const { dbIdx } = this.props;

        console.log('render db ' + dbIdx);
        return <React.Fragment>
            <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
                <Li onClick={this.handleClick} title={`DB${dbIdx}`} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent name={dbIdx} isSelected={false} >
                        {/* {dbs && dbs.length>0 && dbs.map(x=><div key={x}>{x}</div>)} */}
                    </ExpandContent>

                </Li>
            </ContextMenuTrigger>
        </React.Fragment>

    }
}

function mapStateToProps(state) {
    const { dbs, connection } = state.db;
    return { dbs, connection };
}


const db = connect(mapStateToProps)(DB)

export { db as DB }