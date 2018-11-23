import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BackgroundImg from '../assets/imgs/background.jpg';


const ShellDiv = styled.div`
    display:flex;
    justify-content:center;
`

/**
 * 背景板
 */
const Background = styled.div`
        left: 0px;
        right: 0px;
        height: 100vh;
        opacity: 0.5;
        z-index:-1;
        background-attachment:fixed;
        background-image:${props => `url(${props.img})`};
        background-repeat:no-repeat;
        background-size:cover;
        display:block;
        filter: blur(5px);
        float: left;
        position: fixed;`

  

class Shell extends Component {
    render() {
        return <ShellDiv>
            <Background img={BackgroundImg}/>
            <div>{'this is shell!!'}</div>
        </ShellDiv>
    }
}


const mapStateToProps = state => {
    // const state=state.shell
    return { ...state } = state;
}

const shell = connect(mapStateToProps)(Shell);

export { shell as Shell};