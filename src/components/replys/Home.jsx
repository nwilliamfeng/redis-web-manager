import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux';
import {Pages} from '../../constants'
import styled from 'styled-components'
 
 
import {ReplyList} from './ReplyList'

import {CommentList} from './CommentList'


class Home extends Component {

   
    componentDidMount(){
        const {dispatch} =this.props;
        dispatch(commentActions.directToCommentPage(Pages.COMMENT));
    }
    


    render() {
        const {page} =this.props;
       return <React.Fragment>
           {page===Pages.REPLY && <ReplyList/>}
          <CommentList/>
       </React.Fragment>
    }
}

function mapStateToProps(state) {
    const { page } = state.comment;
    return { page };
}


const container = connect(mapStateToProps)(Home)

export { container as Home }