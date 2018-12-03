import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {commandAction} from '../actions'
import { icons} from './icons'
import { nodeTypes, tabPaneTypes } from '../constants'
import { TabPanes,withScroll } from '../controls'
import {ListViewTabPane} from './tabPanes'


const Container = styled.div`
  display: flex;
  width:100%;
  flex-direction:column;
`

const TabPanel = withScroll(props => <div {...props} />)

const tabPaneIds = {
  LIST_VIEW_PANE: 'LIST_VIEW_PANE',
}




class TabPaneList extends Component {


  handleSelectTab = tabId => {
    // this.setState({ selectedPage: tab });
    // alert('select ' + tabId);
  }

  handleCloseTab = tabId => {
     const {dispatch} =this.props;
     dispatch(commandAction.closeListView());
    //alert('close ' + tabId);
  }

  getTabPanes = () => {
    const { tabPanes } = this.props;
    if (tabPanes == null) {
      return [];
    }
    return tabPanes.map(x => { return { tabId: x, title: this.getTabPaneTitle(x),icon:this.getTabPaneIcon(x) } })
  }

  getTabPaneTitle = tabPane => {
    switch (tabPane) {
      case tabPaneIds.LIST_VIEW_PANE:
        return '列表视图';
      default:
        return '未知';
    }
  }

  getTabPaneIcon = tabPane => {
    switch (tabPane) {
      case tabPaneIds.LIST_VIEW_PANE:
        return icons.FOLDER_ICON;
      default:
        return '';
    }
  }

  isTabPaneVisible=name=>{
    const { tabPanes } = this.props;
    if(tabPanes==null){
      return false;
    }
    return tabPanes.some(x=>x===name);
  }

  render() {
    console.log('render tabpanelist');
    const { activeTabPane } = this.props;
    return <Container>
      <TabPanes items={this.getTabPanes()} onClose={this.handleCloseTab} selectedTabId={activeTabPane} onSelect={this.handleSelectTab}/>
      <TabPanel>     
          {this.isTabPaneVisible(tabPaneTypes.LIST_VIEW_PANE) && <ListViewTabPane/> }     
      </TabPanel>

    </Container>

  }
}

const mapStateToProps = state => {
  const { tabPanes, activeTabPane, selectedNodeType, selectedConnection, selectedDB, selectedKey } = state.state;
  return { tabPanes, activeTabPane, selectedNodeType, selectedConnection, selectedDB, selectedKey };
}

const list = connect(mapStateToProps)(TabPaneList)

export { list as TabPaneList }

