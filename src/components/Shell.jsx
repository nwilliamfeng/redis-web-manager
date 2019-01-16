import React, { Component } from 'react';
import styled from 'styled-components';
import BackgroundImg from '../assets/imgs/background.jpg';
import { withScroll, withSplit } from '../controls'
import { ConnectionList } from './ConnectionList'
import { Toolbars } from './toolbar'
import { Menubar } from './Menubar'
import { TabPaneList } from './TabPaneList'
import { Dialog } from './Dialog'
import { connect } from 'react-redux'
import { navigateAction } from '../actions'
import {compositOpenCommand, compositDeleteCommand} from '../components/commands'

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

const Container = styled.div`
    display:flex;
    flex-direction:column;
    background: white;
    height:100vh;
    width:70%;
`

const TabDiv = styled.div`
    display:flex;
    width:100%;
    height:100%;
    -webkit-user-select: none; /* Chrome/Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
`

const MenuBarDiv = styled.div`
    text-align:left;
    width:400px;
`

const OutListDiv = styled.div`
     height:100%;
    padding:0px; 
    outline:0;
`

const ListContainer = withScroll(props => <div {...props} />)

const VerticalSplit = withSplit()

class Shell extends Component {

    handleNavigateKeyDown = e => {     
        e.preventDefault();
        if (e.key === 'ArrowDown') {
            this.props.dispatch(navigateAction.selectByArrow(this.props));
        }
        else if (e.key === 'ArrowUp') {
            this.props.dispatch(navigateAction.selectByArrow(this.props,false));
        }
        else if (e.key === 'Enter') {
            if(compositOpenCommand(this.props).canExecute()){
                compositOpenCommand(this.props).execute();
            }
        }
        else if (e.key === 'Delete') {
            if(compositDeleteCommand(this.props).canExecute()){
                compositDeleteCommand(this.props).execute();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return <ShellDiv>
            <Background img={BackgroundImg} />
            <Container>
                <MenuBarDiv>
                    <Menubar />
                </MenuBarDiv>

                <Toolbars />
                <VerticalSplit size={240} minSize={240} maxSize={290}>
                    <OutListDiv tabIndex={0} onKeyDown={this.handleNavigateKeyDown}>
                        <ListContainer>
                            <ConnectionList />
                        </ListContainer>
                    </OutListDiv>
                    <TabDiv>
                        <TabPaneList />
                    </TabDiv>
                </VerticalSplit>
            </Container>
            <Dialog />
        </ShellDiv>
    }
}

const mapStateToProps = state => {
    return { ...state.key, ...state.state, ...state.db, ...state.connection };
}

const shell = connect(mapStateToProps)(Shell);

export { shell as Shell };

