import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'

export const ColumnFlexDiv = styled.div`
    display:flex;
    width:100%;

`

export const Img = styled.img`
     
    width:${props => props.width ? `${props.width}px` : '16px'};
    height:${props => props.height ? `${props.height}px` : '16px'};
  
`

export const ClickImg = styled(Img)`
    opacity:0.6;
 
    &:hover{
        opacity:1;
    }
    cursor: pointer;
    &:active{
        background:	#F5F5F5;
        border-radius:24px;
    }
`