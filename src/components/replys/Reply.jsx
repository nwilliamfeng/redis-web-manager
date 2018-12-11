import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {ColumnFlexDiv, ClickImg} from './parts'

const likeImgSrc=require('../../assets/imgs/reply/like.png')

const ContainerDiv = styled.div`
     
    width:100%;
    padding-left:10px;
    
`

const ReplyDiv = styled.div`
    display:flex;
    background:white;
    width:100%;
    padding:10px 5px;
    border-top:1px solid #DCDCDC;
`
const UserAvataImg = styled.img`
    width:32px;
    height:32px;
    border-radius:62px;
`


const UserInfoDiv = styled.div`
    width:100%;
    text-align:left;
    color:#4169E1;
    font-size:14px;
     
`

const LikeDiv = styled.div`
    display:flex;
    color:gray;
`

export const Reply = props => {
    const { reply_like_count } = props;
    const handleClick=()=>{
        alert('sdf');
    }
    return <ReplyDiv>
        <UserAvataImg alt='' src={'http://img.zcool.cn/community/01d6f15542ecad0000019ae9a738aa.jpg'} />
        <ContainerDiv >
            <ColumnFlexDiv>
                <UserInfoDiv>
                    {'张三'}
                </UserInfoDiv>
                <LikeDiv>
                    <ClickImg src={likeImgSrc} onClick={handleClick}/>
                    {reply_like_count}
                </LikeDiv>
            </ColumnFlexDiv>
        </ContainerDiv>
    </ReplyDiv>
}