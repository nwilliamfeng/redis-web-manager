import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { keyActions, dbActions, connectionActions } from '../actions'
import { imgSrc } from './imgSrc'
import { Input } from '../controls'
import { locator } from '../utils'



const SearchIcon = styled.i`
    color: gray;
    margin-top: -7px;`


class KeySearch extends Component {

    constructor(props) {
        super(props);  
    }

     

    getDbIdx = dbIdxStr => {
        return dbIdxStr.length > 2 ? dbIdxStr.substring(2) : dbIdxStr;
    }

    handleValueChange = value => {
        this.setState({ path: value })
    }

    handleKeyUp=e=>{
   
        if(e.key==='Enter'){
            const {selectedDbId,selectedConnectionId,dispatch} =this.props;
            dispatch(dbActions.getKeyListByKeyword(selectedConnectionId,selectedDbId,this.input.value));
            console.log(this.input.value);
        }
    }



    componentWillReceiveProps(nextProps, nextContext) {
        const nwPath = locator.getFullPath(nextProps);
        this.setState({ path: nwPath ? nwPath : '' });
    }

    render() {
        return <div className="right-inner-addon" >
            <SearchIcon aria-hidden="true"><FontAwesomeIcon icon={faSearch} /></SearchIcon>
            <input type="search" ref={el=>this.input=el} className="form-control input-xs" placeholder="键值" 
            onKeyUp={this.handleKeyUp}
            style={{ height: 24, width: 200, borderRadius: 0, fontSize: 12, }} />
        </div>
    }
}

function mapStateToProps(state) {
    return { ...state.connection, ...state.db, ...state.key };
}

const nav = connect(mapStateToProps)(KeySearch)

export { nav as KeySearch }