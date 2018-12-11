import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, ClickImg ,Img} from './parts'

import { isEqual } from 'lodash'
import { Reply } from './Reply'

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
    background:	#F5F5F5;
    padding:10px 0px;

`

const HeaderTitleDiv=styled.div`
    font-weight:bold;
    font-size:16px;
    text-align:center;
    padding:4px 0px;
    
    flex:0 1 100%;
   
`


class ReplyList extends Component {

    constructor(props) {

        super(props);
        this.state = { data: null, };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(commentActions.loadReplyList());
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
        alert('back');
    }

    renderReplys = ({ count, re }) => {

        return <React.Fragment>
            {/* <ReplyCountDiv>
                {`共 ${count} 条回复`}
            </ReplyCountDiv> */}
            <HeaderDiv>
                <ClickImg alt='' title='返回' src={backIconSrc} height={32} width={32} onClick={this.handleBackClick} />
                <Img src={logoIconSrc}   height={36} width={42}/>
                <HeaderTitleDiv>{'评论详情'}</HeaderTitleDiv>
            </HeaderDiv>
            <ReplyListDiv>
                {re.map(x => <Reply key={x.reply_id} {...x} />)}
            </ReplyListDiv>

        </React.Fragment>
    }



    render() {
        console.log('render reply list');
        const { data } = this.state;
        if (data == null) {
            return <InfoDiv> {'没有回复数据'} </InfoDiv>
        }
        const { rc, count, me, re } = data;
        console.log(re);
        return <Div>
            {rc === 0 && <InfoDiv> {`加载回复消息失败：${me}`} </InfoDiv>}
            {rc === 1 && this.renderReplys({ count, re })}
        </Div>
    }
}

function mapStateToProps(state) {
    const { replyData } = state.comment;
    return { replyData };
}


const replyList = connect(mapStateToProps)(ReplyList)

export { replyList as ReplyList }