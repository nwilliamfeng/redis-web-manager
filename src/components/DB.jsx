import React, { Component } from 'react'
import { Ul, Li, LiIcon, NameDiv, FlexDiv, EmptyDiv, FlexContainerDiv, LoadingImg } from './parts'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { keyActions,dbActions } from '../actions'
import { connect } from 'react-redux'
import { withExpand,withSelectByClick } from '../controls'


const Content = props => {
    const {name,isLoading}=props;
    return <FlexDiv>
        <FlexContainerDiv>
            <EmptyDiv />
            <LiIcon src={require('../assets/imgs/db.png')} />
            <NameDiv>{`DB${name}`}</NameDiv>
            {/* {props.dbs && props.dbs.length>0 && <div>{`[${props.dbs.length}项]`}</div>} */}
        </FlexContainerDiv>
        {isLoading === true && <LoadingImg />}
    </FlexDiv>
}

const ExpandContent =withSelectByClick( withExpand(props => <Content {...props} />))

class DB extends Component {

    constructor(props) {
        console.log('create db '+props.dbIdx);
        super(props);
        this.state = { keyLoaded: false, keys: [],isLoading:false };
    }

    handleClick = () => {
        const { dispatch, connection,dbIdx } = this.props;
        dispatch(dbActions.selectDB(connection,dbIdx));
      
    }

    handleDoubleClick = () => {
        const {keyLoaded} =this.state;
        const {dbIdx,connection}=this.props;
        if(keyLoaded===false){
            const { dispatch,item } = this.props;
            dispatch(keyActions.getKeyList(connection,dbIdx));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {keyLoaded} =this.state;
       
        if(keyLoaded===false){
            const {keys,connection,dbIdx}=nextProps;
            if(keys!=null && connection===this.props.selectedConnection && dbIdx=== this.props.dbIdx){
                this.setState({keyLoaded:true,keys});
            }
        }
    }

  
    shouldComponentUpdate(nextProps, nextState, nextContext) {
     
        const { connection ,dbIdx,selectedDbIdx,isVisible} = this.props;
        
        // const {dbLoaded}=this.state;
        // if(nextState!=null && nextState.dbLoaded!==dbLoaded){
        //     console.log('check dbloaded '+item.name);
        //     return true;
        // }
        if (nextProps != null && nextProps.selectedConnection===connection) {
            if (dbIdx === selectedDbIdx && nextProps.selectedDbIdx !== dbIdx) {
                return true;
            }
            else if (dbIdx !== selectedDbIdx && nextProps.selectedDbIdx === dbIdx) {
                return true;
            }

            // if( item.name===nextProps.connection){
            //     return true;
            // }
        }

        if(nextProps!=null && nextProps.isVisible!==isVisible){
            return true;
        }

        return false;
    }

    render() {
        const { dbIdx ,isVisible,connection,selectedConnection,selectedDbIdx} = this.props;
        const {keys} =this.state;
        console.log('render db ' + dbIdx);
    
        return <React.Fragment>
           {isVisible &&  <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
                <Li onClick={this.handleClick} title={`DB${dbIdx}`} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent name={dbIdx} isSelected={dbIdx===selectedDbIdx && connection===selectedConnection} >
                        {keys && keys.length>0 && keys.map(x=><div key={x}>{x}</div>)}
                    </ExpandContent>
                </Li>
            </ContextMenuTrigger>}
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const { dbs, connection ,selectedDbIdx,selectedConnection} = state.db;
    return { dbs, connection ,selectedDbIdx,selectedConnection};
}


const db = connect(mapStateToProps)(DB)

export { db as DB }