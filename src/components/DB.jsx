import React, { Component } from 'react'
import { Li, LiIcon, NameDiv, FlexDiv, EmptyDiv, FlexContainerDiv, LoadingImg } from './parts'
import { ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { keyActions, dbActions } from '../actions'
import { connect } from 'react-redux'
import { selectNodeType } from '../constants'
import { withExpand, withSelectByClick } from '../controls'


const Content = props => {
    const { name, isLoading, handleClick } = props;
    return <FlexDiv>
        <FlexContainerDiv onClick={handleClick}>
            <EmptyDiv />
            <LiIcon src={require('../assets/imgs/db.png')} />
            <NameDiv>{`DB${name}`}</NameDiv>
            {/* {props.dbs && props.dbs.length>0 && <div>{`[${props.dbs.length}项]`}</div>} */}
        </FlexContainerDiv>
        {isLoading === true && <LoadingImg />}
    </FlexDiv>
}

const ExpandContent = withSelectByClick(withExpand(props => <Content {...props} />))

class DB extends Component {

    constructor(props) {
        console.log('create db ' + props.dbIdx);
        super(props);
        this.state = { keyLoaded: false, keys: [], isLoading: false };
    }

    handleClick = (e) => {
        const { dispatch, connectionName, dbIdx } = this.props;
        dispatch(dbActions.selectDB(connectionName, dbIdx));

    }

    handleDoubleClick = () => {
        const { keyLoaded } = this.state;
        const { dbIdx, connection } = this.props;
        if (keyLoaded === false) {
            const { dispatch } = this.props;
            dispatch(keyActions.getKeyList(connection, dbIdx));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { keyLoaded } = this.state;

        if (keyLoaded === false) {
            const { keys, connection, dbIdx } = nextProps;
            if (keys != null && connection === this.props.selectedConnection && dbIdx === this.props.dbIdx) {
                this.setState({ keyLoaded: true, keys });
            }
        }
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {

        const { connectionName, dbIdx, selectedDB,isVisible } = this.props;

        // const {dbLoaded}=this.state;
        // if(nextState!=null && nextState.dbLoaded!==dbLoaded){
        //     console.log('check dbloaded '+item.name);
        //     return true;
        // }
        if (nextProps != null && nextProps.selectedConnection != null) {
            if (connectionName === nextProps.selectedConnection) {
                if (dbIdx === selectedDB && nextProps.selectedDB !== dbIdx) {
                    return true;
                }
                else if (dbIdx !== selectedDB && nextProps.selectedDB === dbIdx) {
                    return true;
                }
            }
            else if(dbIdx===selectedDB)
                return true;
        }

        if (nextProps != null && nextProps.isVisible !== isVisible) {
            return true;
        }

        return false;
    }

    render() {
        const { dbIdx, isVisible, selectedDB, selectedConnection, connectionName } = this.props;
        const { keys } = this.state;
        console.log(`render db:dbIdx ${dbIdx} selectedDB ${selectedDB}  selectedConnection ${selectedConnection} connection ${connectionName}` );

        return <React.Fragment>
            {isVisible && <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
                <Li title={`DB${dbIdx}`} onDoubleClick={this.handleDoubleClick}>
                    <ExpandContent name={dbIdx} isSelected={dbIdx === selectedDB && connectionName === selectedConnection} handleClick={this.handleClick}>
                        {keys && keys.length > 0 && keys.map(x => <div key={x}>{x}</div>)}
                    </ExpandContent>
                </Li>
            </ContextMenuTrigger>}
        </React.Fragment>
    }
}

function mapStateToProps(state) {
  
    const { selectedNodeType, selectedDB, selectedConnection } = state.state;
    if(selectedNodeType === selectNodeType.SELECT_DB){
        return {  selectedDB, selectedConnection }
    }
    return state;
  
}


const db = connect(mapStateToProps)(DB)

export { db as DB }