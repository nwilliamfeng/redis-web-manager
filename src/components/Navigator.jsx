import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nodeTypes, dbStates } from '../constants'
import styled from 'styled-components'
import {imgSrc} from './imgSrc'
import {Input} from '../controls'

const navStyle={ width:'100%', height: 24, borderRadius:0,paddingLeft:20}

const Label=styled.label`  
    position: relative;
   
  
   &:before {
    content: "";
    position: absolute;
    left: 2px;
    top: 3px;
    
    width: 16px;
    height:16px;
    background-image:${props=>props.background?`url(${props.background})`:'none'};  
    background-repeat:no-repeat;
    
    background-size:100%;
   }
  `
 

class Navigator extends Component {

   
    render() {
        const {  id,dbIdx, isVisible, dispatch, selectedDbId, selectedConnectionId, connectionName, selectedNodeType, dbState, selectedKeyId } = this.props;

        return <Label background={imgSrc.CONNECT_IMG}><Input style={navStyle}/></Label>
    }
}

function mapStateToProps(state) {
    const { selectedNodeType } = state.state;
    const { selectedDbId } = state.db;
    const { selectedConnectionId } = state.connection;
    return { selectedNodeType, selectedDbId, selectedConnectionId, ...state.key };
}

const nav = connect(mapStateToProps)(Navigator)

export { nav as Navigator }