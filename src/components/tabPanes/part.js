import React, { Component } from 'react'
import styled from 'styled-components'


export const getStyle = (height = 27, width = '100%') => {

    return { borderRadius: 1, height, width, padding: '1px 5px', fontSize: 13, minHeight: height };
}
export const errorStyle = {
    borderColor: 'red',
    boxShadow: '0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6)',
    outline: '0 none',

}

export const Div = styled.div`
    display:flex;
    flex-direction:column;
    padding:15px;
    width:100%;
    height:100%;
`

export const FieldDiv = styled.div`
    display:flex;
    margin-bottom:15px;
    align-items:center;
`
export const LabelDiv = styled.div`
    display:flex;
    text-align:right;
    margin-right:15px;
    justify-content:flex-end;
    width:60px;
    min-width:60px;
`

export const Tr = styled.tr`
    &:nth-child(even){
        background:${props => props.isSelected === true ? 'lightgray' : '#eeee'};	 
    }

   &:nth-child(odd){
    background:${props => props.isSelected === true ? 'lightgray' : 'transparent'};	
    }

     &:hover{
        background:lightgray;
    }
`

export const Table = styled.table`

    width:100%;
`

export const Button = styled.button`
     outline:none;
    border:none;
    background-color:#eeee;
    width:75px;
    height:27px;
    opacity:1;
    &:hover{
        opacity:0.8;
    }
    &:active{
        opacity:0.6;
    }
    &:disabled{
        opacity:0.3;
    }
`

export const Td = styled.td`
    padding:2px 3px;
    text-align:left;
    overflow:hidden;
   
    white-space:nowrap;
    text-overflow:ellipsis;
    font-size:${props => props.fontSize ? props.fontSize : '14px'};
    width:${props => props.width ? props.width : 'auto'};
    max-width:${props => props.width ? props.width : 'auto'};
    border:1px solid #eeee;
    border-right:none;
    &:first-child{
        border-left:none;
    }
`

export const TableContainer = styled.div`
    border: 1px solid #eeee;
    height:  100%;
    overflow-x:  hidden;
    overflow-y:  auto;
    width: 100%;
    min-height: '50%'  ;
`

export const KeysDiv = styled.div`
    width:100%;
    display:flex;
    height:200px;
    padding-bottom:10px;
`