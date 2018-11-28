import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { icons } from './icons'
import { selectNodeType } from '../constants'
import {TabPanes} from '../controls'

const Container=styled.div`
  display: flex;
  width:100%;
  flex-direction:column;
`

const TabPanel=styled.div`
    width:100%;
    height:100%;
    border:1px solid #d3cfcf;
    border-top:none;
     
`

class TabPaneList extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedPage: null,items:[{tabId:selectNodeType.SELECT_CONNECTION,icon:icons.CONNECTION_ICON,title:'abc'},
    {tabId:selectNodeType.SELECT_DB,icon:icons.DB_ICON,title:'ddddfd'}] };
  }

  handleSelectTab = tabId => {
   // this.setState({ selectedPage: tab });
   alert('select ' + tabId);
  }

  handleCloseTab = tabId => {
    alert('close ' + tabId);
  }

  render() {
    const { selectedPage } = this.state;

    return <Container>
      <TabPanes items={this.state.items} onClose={this.handleCloseTab} onSelect={this.handleSelectTab}>
      
      </TabPanes>
      <TabPanel/>
      
    </Container>

  }
}

const mapStateToProps = state => {
  return { ...state };
}

const list = connect(mapStateToProps)(TabPaneList)

export { list as TabPaneList }

