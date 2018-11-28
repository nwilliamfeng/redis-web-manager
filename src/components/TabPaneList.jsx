import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { icons } from './icons'
import { selectNodeType } from '../constants'
require('../assets/styles/react-tabs.css')


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
    display:flex;   
    border:${props => props.isSelected === true ? '1px solid  #d3cfcf' : '1px solid transparent'};
    border-bottom:${props => props.isSelected === true ? '1px solid transparent' : '1px solid #d3cfcf'};
    border-radius:${props => props.isSelected === true ? '12px 12px 0px 0px' : '0px'};
    padding:4px 12px;
    width:160px;
    max-width:160px;
    flex-wrap:nowrap;
    align-items:center;
    justify-content:center;
    /* &:first-child {
       margin-left:0px;
    } */
    &:hover{
      background:${props => props.isSelected === true ? 'white' : 'whitesmoke'};
    }
    background:${props => props.isSelected === true ? 'white' : 'transparent'};
    margin-bottom:-1px;
`

const TitleDiv=styled.div`
    max-width:90px;
    width:90px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`
const TitleContainer=styled.div`
    display:flex;
`

const TabPane = ({ tabId, icon, title, onSelect, onClose, isSelected }) => {
  console.log(isSelected);
  const selectClick = () => {
    onSelect(tabId);
  }
  const closeClick = (e) => {
    e.stopPropagation();
    onClose(tabId);
  }
  return <TabPaneDiv onClick={selectClick} isSelected={isSelected}>
    <TitleContainer>
      <Icon src={icon} alt='' />
      <TitleDiv>{title}</TitleDiv>
    </TitleContainer>
    <CloseIconDiv onClick={closeClick}>
      <FontAwesomeIcon icon={faTimes} />
    </CloseIconDiv>
  </TabPaneDiv>
}


const TabPaneListDiv = styled.div`
    display:flex;
    width:100%;
    border-bottom:1px solid #d3cfcf;
    background:#eee;
`

class TabPaneList extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedPage: null };
  }

  handleSelectTab = tab => {
    this.setState({ selectedPage: tab });
  }

  handleCloseTab = tab => {
    alert('close ' + tab);
  }

  render() {
    const { selectedPage } = this.state;

    return <div style={{ width: '100%' }}>
      <TabPaneListDiv >
        <TabPane isSelected={selectedPage === selectNodeType.SELECT_CONNECTION} tabId={selectNodeType.SELECT_CONNECTION} icon={icons.CONNECTION_ICON} title='sdf' onSelect={this.handleSelectTab} onClose={this.handleCloseTab} />
        <TabPane isSelected={selectedPage === selectNodeType.SELECT_KEY} tabId={selectNodeType.SELECT_KEY} icon={icons.KEY_ICON} title='x234234234234234234fd' onSelect={this.handleSelectTab} onClose={this.handleCloseTab} />
        <TabPane isSelected={selectedPage === selectNodeType.SELECT_DB} tabId={selectNodeType.SELECT_DB} icon={icons.KEY_ICON} title='2342342342342342342342234' onSelect={this.handleSelectTab} onClose={this.handleCloseTab} />
      </TabPaneListDiv>
    </div>

  }
}

const mapStateToProps = state => {
  return { ...state };
}

const list = connect(mapStateToProps)(TabPaneList)

export { list as TabPaneList }

