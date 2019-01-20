import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { dbActions } from '../actions'
import { locator } from '../utils'
import { connectionStates } from '../constants';



const SearchIcon = styled.i`
    color: gray;
    margin-top: -7px;`


class KeySearch extends Component {

    getDbIdx = dbIdxStr => {
        return dbIdxStr.length > 2 ? dbIdxStr.substring(2) : dbIdxStr;
    }

   
    handleKeyUp=e=>{
   
        if(e.key==='Enter'){
            const {selectedDbId, selectedConnectionId,dispatch} =this.props;
            const dbIdx=locator.getSelectedDb(this.props).dbIdx;
            dispatch(dbActions.getKeyListByKeyword(selectedConnectionId,dbIdx,selectedDbId,this.input.value));
        }
    }



    componentWillReceiveProps(nextProps, nextContext) {
        const nwPath = locator.getFullPath(nextProps);
        this.setState({ path: nwPath ? nwPath : '' });
    }

    isEnable=()=>{
        const {selectedDbId} =this.props;
       
        if(selectedDbId==null){
            return false;
        }
        const conn=locator.getSelectedConnection(this.props);

        return conn==null?false:conn.connectionState=== connectionStates.CONNECTED;
 
    }

    render() {  
        return <div className="right-inner-addon" >
            <SearchIcon aria-hidden="true"><FontAwesomeIcon icon={faSearch} /></SearchIcon>
            <input disabled={!this.isEnable()}  type="search" ref={el=>this.input=el} className="form-control input-xs" 
            placeholder="查找键值"
            onKeyUp={this.handleKeyUp}
            style={{ height: 24, width: 240, borderRadius: 0, fontSize: 12, }} />
        </div>
    }
}

function mapStateToProps(state) {
    return { ...state.connection, ...state.db, ...state.key };
}

const nav = connect(mapStateToProps)(KeySearch)

export { nav as KeySearch }