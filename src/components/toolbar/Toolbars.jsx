import React, { Component } from 'react'
import styled from 'styled-components'
import { KeySearch } from '../KeySearch'
import { imgSrc } from '../imgSrc'
import {RedisToolbar} from './RedisToolbar'
import {Navigator} from '../Navigator'
import {NavigatorToolbar} from './NavigatorToolbar'
import {ButtonDiv,Seperator} from './part'


const ToolbarDiv = styled.div`
    background:#f5f5f5;
    display:flex;
    padding:4px 10px 4px 0px;
    width:100%;
    align-items:center;
    border-bottom:1px solid lightgray;
    
`



 export class Toolbars extends Component {

  

    render() {
        return <ToolbarDiv>
            <ButtonDiv>
                <NavigatorToolbar/>
                <Seperator />
                 <RedisToolbar/>
            </ButtonDiv>
            <div style={{flex:'0 1 100%',padding:'0px 10px'}}><Navigator/></div>
            <KeySearch  />
        </ToolbarDiv>
    }
}


 