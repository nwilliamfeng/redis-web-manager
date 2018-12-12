import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, ClickImg, ButtonDiv } from './parts'

const likeImgSrc = require('../../assets/imgs/reply/like.png')

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

const ContentDiv = styled.div`
    margin-top:8px;
    text-align:left;

`

const ReplyButton = styled.div`
    padding:0px 6px;
    border:lightgray solid 1px;
    border-radius:12px;
`

const FooterDiv = styled(ColumnFlexDiv)`
    color:lightgray;
    font-size:8px;
    padding-top:5px;
    justify-content: space-between;
    align-items:center;
`

const ReplyUser = ({ value }) => {
    if (value == null) {
        return <React.Fragment />
    }
    const { user_nickname, user_influ_level, user_age } = value;
    return <div>
        {user_nickname}
        <ColumnFlexDiv style={{ color: 'gray', fontSize: '8px' }}>
            {`影响力: ${user_influ_level}，注册时长: ${user_age}`}

        </ColumnFlexDiv>
    </div>
}

const ChildReplyDiv = styled(ColumnFlexDiv)`
     
`

const ChildReplyListDiv = styled.div`
    padding:5px 0px 5px 10px;
    text-align:left;
`


const ChildReply = props => {
    const { reply_user, reply_text } = props;
    return <div>
        <span style={{ color: '#4169E1' }}>{reply_user.user_nickname}</span>{`：  ${reply_text}`}
    </div>
}


const ChildReplys = ({ items }) => {
    return <ChildReplyListDiv>
        {items.map(x => <ChildReply key={x.reply_id} {...x} />)}
    </ChildReplyListDiv>
}



const ShowMoreDiv = styled(ColumnFlexDiv)`
    justify-self: flex-start;
    align-items:flex-start;
    justify-content:flex-start;
    margin-left:10px;
`

export const Reply = props => {
    const { user_id, reply_id, reply_like_count, reply_text, reply_user, reply_time, reply_picture, child_replys, reply_count, source_reply, dispatch,replyPageSize } = props;
    const handleClick = () => {
        dispatch(commentActions.loadReplyList('5127', reply_id,-1,1,replyPageSize));
    }
    return <ReplyDiv>
        <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${user_id}/120`} />
        <ContainerDiv >
            <ColumnFlexDiv>
                <UserInfoDiv>
                    <ReplyUser value={reply_user} />
                </UserInfoDiv>
                <LikeDiv>
                    <ClickImg src={likeImgSrc}  />
                    {reply_like_count}
                </LikeDiv>
            </ColumnFlexDiv>
            <ContentDiv>
                {source_reply && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
            </ContentDiv>
            <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: '400px' }} />
            <FooterDiv>
                {reply_time}
                <ReplyButton>{'回复'}</ReplyButton>
                {'...'}
            </FooterDiv>
            {child_replys && <ChildReplys items={child_replys} />}
            <ShowMoreDiv>
                {reply_count > 0 && <ButtonDiv title={'显示所有回复'} onClick={handleClick}>{`显示全部${reply_count}条回复>`}</ButtonDiv>}
            </ShowMoreDiv>

        </ContainerDiv>

    </ReplyDiv>
}

export const Comment = props => {
    const { user_id,  reply_like_count, reply_text, reply_user, reply_time, reply_picture } = props;

    return <ReplyDiv>
        <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${user_id}/120`} />
        <ContainerDiv >
            <ColumnFlexDiv>
                <UserInfoDiv>
                    <ReplyUser value={reply_user} />
                </UserInfoDiv>
                <LikeDiv>
                    <ClickImg src={likeImgSrc} />
                    {reply_like_count}
                </LikeDiv>
            </ColumnFlexDiv>
            <ContentDiv>
                {reply_text}
            </ContentDiv>
            <img alt='' src={reply_picture} style={{ maxWidth: '100%' }} />
            <FooterDiv>
                {reply_time}
                <ReplyButton>{'回复'}</ReplyButton>

            </FooterDiv>


        </ContainerDiv>

    </ReplyDiv>
}

export const PageNavigator = ({onPreviousClick,onNextClick}) => {
    return <ColumnFlexDiv style={{ justifyContent: 'center', width: '100%', alignItems: 'center', padding: 10, background: '#F5F5F5' }}>
        <div onClick={onPreviousClick} style={{ color: '#4169E1', cursor: 'pointer' }}>{'上一页'}</div>
        <div onClick={onNextClick} style={{ marginLeft: 10, color: '#4169E1', cursor: 'pointer' }}>{'下一页'}</div>
    </ColumnFlexDiv>
}