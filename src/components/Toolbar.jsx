import React, { Component } from 'react'
import styled from 'styled-components'
import { KeySearch } from './KeySearch'
import {FolderIcon, PreviousIcon} from './icons'



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

const Svg=styled.svg`
    fill:blue;
    width:32px;
    height:32px;
    pointer-events: all;
    &:hover{
        fill:red;
    }

`

 

// const d=FolderIcon({});
// const SvgBtn=props=> {
    
//     console.log(props);
//     const {children,...others}=props.props;
//     return <Svg {...others}>
//     { children}
//     </Svg>
// }

const d=FolderIcon({});

const withSvg=props=>icon=> {
    
  console.log(icon );
    const {children,...others}=icon.props;
    return <Svg {...others}>
    { children}
    </Svg>
}

const y=withSvg(props=><PreviousIcon/>);


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