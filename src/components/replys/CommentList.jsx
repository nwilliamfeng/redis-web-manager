import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv,PostIdInput } from './parts'

import { isEqual } from 'lodash'
import { Reply,PageNavigator } from './Reply'
import { withScroll } from '../../controls'
import { Pages } from '../../constants';



const InfoDiv = styled.div`
    display:flex;
   align-items:center;
    justify-content:center;
    height:100%;
     font-size:20px;
     color: gray;
`

const Div = styled.div`
    display:flex;
    height:100%;
    flex-direction:column;
    padding:10px;
`



const HeaderDiv = styled(ColumnFlexDiv)`
    margin:0px 0px 20px 0px;
   
`

const ReplyListDiv = styled.div`
    width:100%;
    /* background:	#F5F5F5; */
    
`

const ReplyListContainer = withScroll(props => <ReplyListDiv {...props} />)

const HeaderTitleDiv = styled.div`
    font-weight:bold;
    font-size:16px;
    text-align:center;
    padding:4px 0px;
    
    flex:0 1 100%;
   
`

const ListHeaderDiv = styled.div`
    display:flex;
    justify-content: space-between;
    color:gray;
    margin-top:10px;
    margin-bottom:10px;
`


class CommentList extends Component {

    constructor(props) {
        console.log('create commentList');
        super(props);
        this.state = { comments: [], pageCount: 0 };
    }

    // componentDidMount() {
    //     const { dispatch, commentSortType, commentPage, commentPageSize } = this.props;
    //     dispatch(commentActions.loadCommentList(commentSortType, commentPage, commentPageSize));
    // }


    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps != null) {
            const { commentPageSize, commentData } = nextProps;
            const pageCount = this.state.pageCount === 0 ? Math.ceil(commentData.count / commentPageSize) : this.state.pageCount;

            this.setState({ comments: nextProps.commentData.re, pageCount: pageCount });
        }

    }

    sortComments = () => {
        const { commentSortType, commentPageSize, commentPage,postId } = this.props;
        const nwSortType = commentSortType === -1 ? 1 : -1;
        this.props.dispatch(commentActions.loadCommentList(postId,nwSortType, commentPage, commentPageSize));
    }

    loadNextPage = () => {
        const { commentSortType, commentPageSize, commentPage,postId } = this.props;
        if (commentPage >= this.state.pageCount) {
            alert('已经是最后一页了');
            return;
        }
        this.props.dispatch(commentActions.loadCommentList(postId,commentSortType, commentPage + 1, commentPageSize));
    }

    loadPreviousPage = () => {
        const { commentSortType, commentPageSize, commentPage,postId } = this.props;
        if (commentPage === 1) {
            alert('已经是第一页了');
            return;
        }
        this.props.dispatch(commentActions.loadCommentList(postId,commentSortType, commentPage - 1, commentPageSize));
    }


    inputKeyPress=e=>{
        if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
            const postId=this.postIdInput.value ;
            const { commentSortType, commentPageSize, commentPage,dispatch } = this.props;
            dispatch(commentActions.loadCommentList(postId, commentSortType, commentPage, commentPageSize));
       }
    }

    renderComments = ({ count, comments }) => {
        const { dispatch, commentSortType,replyPageSize,postId } = this.props;

        return <React.Fragment>


            <ListHeaderDiv>
                <div style={{ fontWeight: 'bold' }}> {`评论${count}`}</div>
                <PostIdInput   class="form-control btn-group-xs" ref={el=>this.postIdInput=el} onKeyPress={this.inputKeyPress} placeholder="请输入贴子id"></PostIdInput>
                <div onClick={this.sortComments} style={{ color: '#4169E1', cursor: 'pointer' }}>{commentSortType === -1 ? '智能排序' : '时间排序'}</div>
            </ListHeaderDiv>
            <ReplyListContainer>
                {comments.map(x => <Reply key={x.reply_id} {...x} dispatch={dispatch} replyPageSize={replyPageSize} postId={postId}/>)}
            </ReplyListContainer>
           
            <PageNavigator onPreviousClick={this.loadPreviousPage} onNextClick={this.loadNextPage}/>


        </React.Fragment>
    }

    directToReplyPage = ( ) => {
        const { dispatch } = this.props;
        dispatch(commentActions.directToCommentPage(Pages.REPLY));
    }





    // render() {
    //     console.log('render comment list');


    //     const { page, commentData } = this.props;
    //     if (page === Pages.REPLY) {
    //         return <React.Fragment />
    //     }
    //     if (commentData == null) {
    //         return <InfoDiv> {'正在加载数据...'} </InfoDiv>
    //     }
    //     const { rc, count, me } = commentData;
    //     const { comments } = this.state;

    //     return <Div>
    //         {rc === 0 && <InfoDiv> {`加载评论消息失败：${me}`} </InfoDiv>}
    //         {rc === 1 && this.renderComments({ count, comments })}
    //     </Div>
    // }

    render() {
        console.log('render comment list');


        const { page, commentData } = this.props;
        if (page === Pages.REPLY) {
            return <React.Fragment />
        }
        if (commentData == null) {
            return <ColumnFlexDiv style={{justifyContent:'center',alignItems:'center',height:'100%',padding:50}} >
            <input  class="form-control btn-group-xs" ref={el=>this.postIdInput=el} onKeyPress={this.inputKeyPress} placeholder="请输入贴子id"></input>
            </ColumnFlexDiv>
            
        }
        const { rc, count, me } = commentData;
        const { comments } = this.state;

        return <Div>
            {rc === 0 && <InfoDiv> {`加载评论消息失败：${me}`} </InfoDiv>}
            {rc === 1 && this.renderComments({ count, comments })}
        </Div>
    }
}

function mapStateToProps(state) {
    const { commentData, page, commentPage, commentPageSize,replyPageSize, commentSortType,postId } = state.comment;
    return { commentData, page, commentPage, commentPageSize,replyPageSize, commentSortType,postId };
}


const commentList = connect(mapStateToProps)(CommentList)

export { commentList as CommentList }