import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, ClickImg, Img } from './parts'

import { isEqual } from 'lodash'
import { Reply, Comment } from './Reply'
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

const ReplyCountDiv = styled.div`
    align-self: flex-end;
    font-size:14px;
    background:orange;
    padding:5px;
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


class ReplyList extends Component {

    constructor(props) {
        console.log('create replyList');
        super(props);
        this.state = { data: null, };
    }

    componentDidMount() {
        // const { dispatch } = this.props;
        // dispatch(commentActions.loadReplyList());
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps != null) {
            this.setState({ data: nextProps.replyData })
        }

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return true;
    }

    handleBackClick = e => {
        e.stopPropagation();
        const { dispatch } = this.props;
        dispatch(commentActions.directToCommentPage(Pages.COMMENT));
    }

    renderReplys = ({ re }) => {
        const { child_replys } = re[0];
        return <React.Fragment>
            <HeaderDiv>
                <ClickImg alt='' title='返回' src={backIconSrc} height={32} width={32} onClick={this.handleBackClick} />
                <Img src={logoIconSrc} height={36} width={42} />
                <HeaderTitleDiv>{'评论详情'}</HeaderTitleDiv>
            </HeaderDiv>
            <div style={{ marginBottom: 20 }}>
                <Comment {...re[0]} />
            </div>

            <ListHeaderDiv>
                {'全部回复'}
                <div style={{ color: '#4169E1' }}>{'智能排序'}</div>
            </ListHeaderDiv>
            <ReplyListContainer>
                {child_replys && child_replys.map(x => <Reply key={x.reply_id} {...x} />)}
            </ReplyListContainer>

        </React.Fragment>
    }



    render() {
        console.log('render reply list');
        const { data } = this.state;
        if (data == null) {
            return <InfoDiv>
                {'没有回复数据'}
                <div style={{color:'blue'}} onClick={this.directToCommentPage}>{'点击返回'}</div>
            </InfoDiv>
        }
        const { rc, me, re } = data;
        return <Div>
            {rc === 0 && <InfoDiv> {`加载回复消息失败：${me}`} </InfoDiv>}
            {rc === 1 && this.renderReplys({ re })}
        </Div>
    }
}

function mapStateToProps(state) {
    const { replyData } = state.comment;
    return { replyData };
}


const replyList = connect(mapStateToProps)(ReplyList)

export { replyList as ReplyList }