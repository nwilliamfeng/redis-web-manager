import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const CloseIconDiv = styled.div`
    color: gray;
    &:hover{
      color:red;
    }
    margin-left:5px;
`
const Icon = styled.img`
    width:16px;
    height:16px;
    margin-right:3px;
`

const TabPaneDiv = styled.div`
    cursor:pointer;     
    border:${props => props.isSelected === true ? '1px solid  #d3cfcf' : '1px solid transparent'};   
    border-radius:${props => props.isSelected === true ? '0px 12px 0px 0px' : '0px'};
    border-bottom:${props => props.isSelected === true ? '1px solid transparent' : '1px solid #d3cfcf'}; 
    margin-left:${props => props.isSelected === true ? '-2px' : '0px'};
    z-index:${props => props.isSelected === true ? '100' : '0'};
    padding:4px 12px;
    width:160px;
    max-width:160px;
    padding-right:0px;
    &:first-child {
        margin-left:0px;
    }
    &:hover{
      background:${props => props.isSelected === true ? 'white' : 'whitesmoke'};
    }
    background:${props => props.isSelected === true ? 'white' : 'transparent'};
    margin-bottom:-1px;
`

const TitleDiv = styled.div`
    max-width:90px;
    width:90px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`
const TitleContainer = styled.div`
    display:flex;
`

const InnerTabPaneDiv = styled.div`
    border-right:${props => props.isSelected === true ? '1px solid  transparent' : '1px solid lightgray'};
    display:flex;
    flex-wrap:nowrap;
    align-items:center;
    padding-right:7px;
    justify-content:space-between;
`

const TabPane = ({ tabId, icon, title, onSelect, onClose, isSelected }) => {
    const selectClick = () => {
        onSelect(tabId);
    }
    const closeClick = (e) => {
        e.stopPropagation();
        onClose(tabId);
    }
    return <TabPaneDiv onClick={selectClick} isSelected={isSelected}>
        <InnerTabPaneDiv isSelected={isSelected}>
            <TitleContainer>
                <Icon src={icon} alt='' />
                <TitleDiv title={title}>{title}</TitleDiv>
            </TitleContainer>
            <CloseIconDiv onClick={closeClick} title='关闭'>
                <FontAwesomeIcon icon={faTimes} />
            </CloseIconDiv>
        </InnerTabPaneDiv>

    </TabPaneDiv>
}


const TabPaneListDiv = styled.div`
    display:flex;
    width:100%;
    border-bottom:1px solid #d3cfcf;
    flex-wrap:wrap;
    background:#eee;
`

export class TabPanes extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedPage: null };
    }

    handleSelectTab = tabId => {
        this.setState({ selectedPage: tabId });
        const {onSelect} = this.props;
        if(onSelect){
            onSelect(tabId);
        }
    }

    handleCloseTab = tabId => {
        const {onClose} = this.props;
        if(onClose){
            onClose(tabId);
        }
    }

    render() {
        const { selectedPage } = this.state;
        const { items } = this.props;
        return <TabPaneListDiv >
            {items && items.map(x => 
            <TabPane {...x} 
                 isSelected={selectedPage===x.tabId}
                 onSelect={this.handleSelectTab}
                 onClose={this.handleCloseTab}
                 />)}
        </TabPaneListDiv>


    }
}


