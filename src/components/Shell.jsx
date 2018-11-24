import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BackgroundImg from '../assets/imgs/background.jpg';
import { withScroll, withSplit } from '../controls'
import { ConnectionList } from './ConnectionList'
import { KeySearch } from './KeySearch'

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
    justify-content:center;
    flex-direction:row;
    background: white;
    height:100vh;
    width:70%;
`

const DetailDiv = styled.div`height:100%;`

const ListRegion = styled.div`
     
    display:flex;
    height:100vh;
    flex-direction:column;`

const ListContainerDiv = styled.div`
    overflow:hidden;
    padding:2px;
    height:  100%  ;`


const ListContainer = withScroll(props => <div {...props} />)


const SearchBoxContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:14px 8px 6px 8px;`

const VerticalSplit = withSplit()

class Shell extends Component {
    render() {
        return <ShellDiv>
            <Background img={BackgroundImg} />
            <Container>
                <VerticalSplit size={241} minSize={241} maxSize={290}>
                    <ListRegion>
                        <SearchBoxContainer>
                            <KeySearch />
                        </SearchBoxContainer>
                        <ListContainerDiv>
                            <ListContainer>
                                <ConnectionList />
                            </ListContainer>
                        </ListContainerDiv>

                    </ListRegion>
                    <DetailDiv />
                </VerticalSplit>
            </Container>

        </ShellDiv>
    }
}


const mapStateToProps = state => {
    // const state=state.shell
    return { ...state } = state;
}

const shell = connect(mapStateToProps)(Shell);

export { shell as Shell };