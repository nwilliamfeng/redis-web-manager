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

const ExpandContentDiv = styled.div`
    margin-top:8px;
    text-align:left;
    
   max-height:300px;
`

const ContentDiv = styled(ExpandContentDiv)`
    
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
   text-overflow:ellipsis;
   overflow: hidden;
   
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

const ReplyUser = ({ value, isAuthor, isTop }) => {
    if (value == null) {
        return <React.Fragment />
    }
    const { user_nickname, user_influ_level, user_age } = value;
    return <div>
        {user_nickname}{isAuthor === true && <span style={{ background: '#4169E1', padding: '1px 3px', color: 'white', fontSize: 10, marginLeft: 5 }}>{'作者'}</span>}
        {isTop === true && <span style={{ background: 'gray', padding: '1px 3px', color: 'white', fontSize: 10, marginLeft: 5 }}>{'置顶'}</span>}

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
    const { reply_user, reply_text, user_id, reply_id, sourceReplyId,reply_is_author} = props;
    //console.log(reply_id + '   ' + sourceReplyId);
    return <div>
        <span style={{ color: '#4169E1' }}>{reply_user.user_nickname}</span>{reply_is_author===true && <span style={{ background: '#4169E1', padding: '1px 3px', color: 'white', fontSize: 10, marginLeft: 5 }}>{'作者'}</span>}{`：  ${reply_text}`}
    </div>
}


const ChildReplys = ({ items, sourceReplyId }) => {
    return <ChildReplyListDiv>
        {items.map(x => <ChildReply key={x.reply_id} {...x} sourceReplyId={sourceReplyId} />)}
    </ChildReplyListDiv>
}



const ShowMoreDiv = styled(ColumnFlexDiv)`
    justify-self: flex-start;
    align-items:flex-start;
    justify-content:flex-start;
    margin-left:10px;
`

const ShowMoreTextDiv = styled(ColumnFlexDiv)`
    justify-self: flex-start;
    align-items:flex-start;
    justify-content:flex-end;
  
`

export class Reply extends Component {

    constructor(props) {
        super(props);
        this.state = { needContentExpand: false };
    }

    handleClick = () => {
        const { user_id, reply_is_top, reply_id, reply_is_author, reply_like_count, reply_text, reply_user, reply_time, reply_picture, child_replys, reply_count, source_reply, dispatch, replyPageSize, postId } = this.props;

        dispatch(commentActions.loadReplyList(postId, reply_id, -1, 1, replyPageSize));
    }

    handleShowExpand = () => {
        this.setState({ needContentExpand: true });
    }

    render() {
        const { user_id, reply_is_top, reply_id, reply_is_author, reply_like_count, reply_text, reply_user, reply_time, reply_picture, child_replys, reply_count, source_reply, dispatch, replyPageSize, postId } = this.props;

        const showMoreContent = reply_text.length > 96;
        const { needContentExpand } = this.state;

        return <ReplyDiv>
            <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${user_id}/120`} />
            <ContainerDiv >
                <ColumnFlexDiv>
                    <UserInfoDiv>
                        <ReplyUser value={reply_user} isAuthor={reply_is_author} isTop={reply_is_top} />
                    </UserInfoDiv>
                    <LikeDiv>
                        <ClickImg src={likeImgSrc} />
                        {reply_like_count}
                    </LikeDiv>
                </ColumnFlexDiv>
                <div>
                    {needContentExpand === true && <ExpandContentDiv>
                        {source_reply && source_reply.length > 0 && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
                    </ExpandContentDiv>}
                    {needContentExpand === false && <ContentDiv>
                        {source_reply && source_reply.length > 0 && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
                    </ContentDiv>}
                    <ShowMoreTextDiv>
                        {showMoreContent === true && needContentExpand === false && <ButtonDiv style={{ justifySelf: 'flex-end' }} onClick={this.handleShowExpand}>{'展开'}</ButtonDiv>}
                    </ShowMoreTextDiv>

                </div>

                <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: '200px', margin: 3 }} />
                <FooterDiv>
                    {reply_time}
                    <ReplyButton>{'回复'}</ReplyButton>
                    {'...'}
                </FooterDiv>
                {child_replys && <ChildReplys items={child_replys} sourceReplyId={reply_id} />}
                <ShowMoreDiv>
                    {reply_count > 0 && <ButtonDiv title={'显示所有回复'} onClick={this.handleClick}>{`显示全部${reply_count}条回复>`}</ButtonDiv>}
                </ShowMoreDiv>

            </ContainerDiv>

        </ReplyDiv>
    }
}

// export const Reply = props => {
//     const { user_id,reply_is_top, reply_id,reply_is_author, reply_like_count, reply_text, reply_user, reply_time, reply_picture, child_replys, reply_count, source_reply, dispatch,replyPageSize,postId } = props;
//     const handleClick = () => {
//         dispatch(commentActions.loadReplyList(postId, reply_id,-1,1,replyPageSize));
//     }
//     const showMoreContent= reply_text.length>96;

//     return <ReplyDiv>
//         <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${user_id}/120`} />
//         <ContainerDiv >
//             <ColumnFlexDiv>
//                 <UserInfoDiv>
//                     <ReplyUser value={reply_user} isAuthor={reply_is_author} isTop={reply_is_top}/>
//                 </UserInfoDiv>
//                 <LikeDiv>
//                     <ClickImg src={likeImgSrc}  />
//                     {reply_like_count}
//                 </LikeDiv>
//             </ColumnFlexDiv>
//             <div>
//             <ContentDiv>
//                 {source_reply && source_reply.length>0 && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
//             </ContentDiv>
//             <ShowMoreTextDiv>
//             {showMoreContent===true && <ButtonDiv style={{ justifySelf:'flex-end'}}>{'展开'}</ButtonDiv>}
//             </ShowMoreTextDiv>

//             </div>

//             <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: '200px',margin:3 }} />
//             <FooterDiv>
//                 {reply_time}
//                 <ReplyButton>{'回复'}</ReplyButton>
//                 {'...'}
//             </FooterDiv>
//             {child_replys && <ChildReplys items={child_replys} sourceReplyId={reply_id}/>}
//             <ShowMoreDiv>
//                 {reply_count > 0 && <ButtonDiv title={'显示所有回复'} onClick={handleClick}>{`显示全部${reply_count}条回复>`}</ButtonDiv>}
//             </ShowMoreDiv>

//         </ContainerDiv>

//     </ReplyDiv>
// }

export const Comment = props => {
    const { user_id, reply_is_author, reply_like_count, reply_text, reply_user, reply_time, reply_picture } = props;
    return <ReplyDiv>
        <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${user_id}/120`} />
        <ContainerDiv >
            <ColumnFlexDiv>
                <UserInfoDiv>
                    <ReplyUser value={reply_user} isAuthor={reply_is_author} />
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

export const PageNavigator = ({ onPreviousClick, onNextClick }) => {
    return <ColumnFlexDiv style={{ justifyContent: 'center', width: '100%', alignItems: 'center', padding: 10, background: '#F5F5F5' }}>
        <div onClick={onPreviousClick} style={{ color: '#4169E1', cursor: 'pointer' }}>{'上一页'}</div>
        <div onClick={onNextClick} style={{ marginLeft: 10, color: '#4169E1', cursor: 'pointer' }}>{'下一页'}</div>
    </ColumnFlexDiv>
}