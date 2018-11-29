import React, { Component } from 'react'
import styled from 'styled-components'
import { KeySearch } from './KeySearch'




const ToolbarDiv = styled.div`
    background:#eee;
    display:flex;
    padding:8px 10px;
    width:100%;
    align-items:center;
    border-bottom:1px solid lightgray;
`

const PathDiv = styled.div`
    flex:0 1 100%;
    height:100%;
    align-items:center;
    justify-content:left;
    text-align:left;
    width:100px;
`

 


export class Toolbar extends Component {

    render() {
        return <ToolbarDiv>
            <PathDiv>
              
            </PathDiv>
            <button>{'abc'}</button>
            <button>{'abc'}</button>
            <button>{'abc'}</button>

            <KeySearch searchBoxStyle={{ height: 26, width: 200 }} />


        </ToolbarDiv>
    }
}