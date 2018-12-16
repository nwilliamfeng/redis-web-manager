import React, { Component } from 'react'

import { commentActions } from '../../actions'
import { connect } from 'react-redux';
import { Pages } from '../../constants'
import styled from 'styled-components'
import { ReplyList } from './ReplyList'
import { CommentList } from './CommentList'
import { withCookies, Cookies } from 'react-cookie';

class Home extends Component {


    componentDidMount() {
        const { dispatch } = this.props;
        const { cookies } = this.props;
    //    cookies.set('name', 'name', { path: 'abc' });
    //https://github.com/reactivestack/cookies/blob/cb26b0caa101dc4760812ff61697deaf1c700ada/packages/universal-cookie/README.md
          console.log(document.cookie  )
     
        dispatch(commentActions.directToCommentPage(Pages.COMMENT));
    }


    getCookie = param => {
        if (document.cookie.length > 0) {
            let cStart = document.cookie.indexOf(param + "=");
            if (cStart != -1) {
                cStart = cStart + param.length + 1;
                let cEnd = document.cookie.indexOf(";", cStart);
                if (cEnd == -1) cEnd = document.cookie.length;
                return decodeURI(document.cookie.substring(cStart, cEnd));
            }
        }
    }


    render() {
        const { page } = this.props;
        return <React.Fragment>
            {page === Pages.REPLY && <ReplyList />}
            <CommentList />
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const { page } = state.comment;
    return { page };
}


const container = connect(mapStateToProps)(withCookies(Home))

export { container as Home }