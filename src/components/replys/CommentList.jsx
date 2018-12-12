import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, ClickImg, Img } from './parts'

import { isEqual } from 'lodash'
import { Reply } from './Reply'
import { withScroll } from '../../controls'
import { Pages } from '../../constants';

const backIconSrc = require('../../assets/imgs/reply/back.png')
const logoIconSrc = require('../../assets/imgs/reply/logo.jpg')

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
        this.state={comments:[],pageCount:0};
    }

    componentDidMount() {
        const { dispatch ,sortType,commentPage,commentPageSize} = this.props;
        dispatch(commentActions.loadCommentList(sortType,commentPage,commentPageSize));
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps != null) {
            const {commentPageSize,commentData}=nextProps;
            const pageCount=this.state.pageCount===0?Math.ceil (commentData.count /commentPageSize) :this.state.pageCount;
            
            this.setState({ comments: nextProps.commentData.re,pageCount:pageCount });
        }

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return true;
    }


    sortComments=()=>{
        const {sortType,commentPageSize,commentPage} =this.props;
        const nwSortType=sortType===-1?1:-1; 
        this.props.dispatch(commentActions.loadCommentList(nwSortType,commentPage,commentPageSize));
    }

    loadNextPage=()=>{
        const {sortType,commentPageSize,commentPage} =this.props;
         if(commentPage>=this.state.pageCount){
             alert('已经是最后一页了');
             return;
         }
        this.props.dispatch(commentActions.loadCommentList(sortType,commentPage+1,commentPageSize));
    }

    loadPreviousPage=()=>{
        const {sortType,commentPageSize,commentPage} =this.props;
         if(commentPage==1){
             alert('已经是第一页了');
             return;
         }
        this.props.dispatch(commentActions.loadCommentList(sortType,commentPage-1,commentPageSize));
    }

     

    renderComments = ({ count, comments }) => {
        const {dispatch,sortType}=this.props;
        
        return <React.Fragment>


            <ListHeaderDiv>
                <div style={{ fontWeight:'bold' }}> {`评论${count}`}</div>
                <div onClick={this.sortComments} style={{ color: '#4169E1' ,cursor:'pointer'}}>{sortType===-1?'智能排序':'时间排序'}</div>
            </ListHeaderDiv>
            <ReplyListContainer>
                {comments.map(x => <Reply key={x.reply_id} {...x}  dispatch={dispatch}/>)}
            </ReplyListContainer>
            <ColumnFlexDiv style={{justifyContent:'center',width:'100%',alignItems:'center',padding:10,background:'#F5F5F5'}}>
            <div onClick={this.loadPreviousPage} style={{ color: '#4169E1' ,cursor:'pointer'}}>{'上一页'}</div>
            <div onClick={this.loadNextPage} style={{ marginLeft:10, color: '#4169E1' ,cursor:'pointer'}}>{'下一页'}</div>
            </ColumnFlexDiv>
            

        </React.Fragment>
    }

    directToReplyPage = ({}) => {
        const { dispatch } = this.props;
        dispatch(commentActions.directToCommentPage(Pages.REPLY));
    }


    


    render() {
        console.log('render comment list');
      

        const {page, commentData } = this.props;
        if(page===Pages.REPLY){
            return <React.Fragment/>
        }
        if (commentData == null) {
            return <InfoDiv> {'没有评论数据'} </InfoDiv>
        }
        const { rc, count, me } = commentData;
        const {comments} =this.state;
     
        return <Div>
            {rc === 0 && <InfoDiv> {`加载评论消息失败：${me}`} </InfoDiv>}
            {rc === 1 && this.renderComments({ count, comments })}
        </Div>
    }
}

function mapStateToProps(state) {
    const { commentData ,page,commentPage,commentPageSize,sortType} = state.comment;
    return { commentData,page ,commentPage,commentPageSize,sortType};
}


const commentList = connect(mapStateToProps)(CommentList)

export { commentList as CommentList }