import React, { Component } from 'react'
import styled from 'styled-components'
import { KeySearch } from '../KeySearch'
import { imgSrc } from '../imgSrc'
import { Button } from '../../controls'
import {RedisToolbar} from './RedisToolbar'


const ToolbarDiv = styled.div`
    background:#eee;
    display:flex;
    padding:4px 10px;
    width:100%;
    align-items:center;
    border-bottom:1px solid lightgray;
`

const ButtonDiv = styled.div`
    flex:0 1 100%;
    height:100%; 
    margin-left:5px;
    align-items:center;
    justify-content:left;
    text-align:left;
    display:flex;
`
const Seperator = styled.div`
    height:20px;
    width:1px;
    margin-right:10px;
    border-left:gray solid 1px;
`

const ToolbarButton = styled(Button)`   
    height:${props => props.height ? props.height : '24px'};
    width:${props => props.width ? props.width : '24px'};
    background-image:${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
    background-repeat:no-repeat;
    margin-right:8px;
    background-size:100%;
 `



 export class Toolbars extends Component {
    render() {
        return <ToolbarDiv>
            <ButtonDiv>
                <ToolbarButton title='返回' height={'18px'} width={'18px'} backgroundImage={imgSrc.PREVIOUS_IMG}></ToolbarButton>
                <ToolbarButton title='返回上级' height={'18px'} width={'18px'} backgroundImage={imgSrc.UP_IMG}></ToolbarButton>
                <Seperator />
                 <RedisToolbar/>
            </ButtonDiv>
            <KeySearch searchBoxStyle={{ height: 26, width: 200 }} />
        </ToolbarDiv>
    }
}


 