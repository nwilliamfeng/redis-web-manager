import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {commandAction} from '../actions'
import { FolderIcon,SettingIcon} from './icons'
import { nodeTypes, tabPaneIds } from '../constants'
import { TabPanes,withScroll,IconList } from '../controls'
import {ListViewTabPane,SettingTabPane} from './tabPanes'


const Container = styled.div`
  display: flex;
  width:100%;
  flex-direction:column;
`

const TabPanel = withScroll(props => <div {...props} />)


class TabPaneList extends Component {

  constructor(props){
     super(props);
     this.registPaneIcons();
  }

  registPaneIcons = () => {
    const add = ({ key, icon }) => {
        if (IconList.find(x => x.key === key) == null) {
            IconList.push({ key, icon });
        }
    }
    add({ key: tabPaneIds.LIST_VIEW_PANE, icon: FolderIcon });
    add({ key: tabPaneIds.SETTING_PANE, icon: SettingIcon });
}


  handleSelectTab = tabId => {
    // this.setState({ selectedPage: tab });
    const {dispatch} =this.props;
    dispatch(commandAction.selectTabPane(tabId));

  }

  handleCloseTab = tabId => {
     const {dispatch} =this.props;
     dispatch(commandAction.closeTabPane(tabId));
  }

  getTabPanes = () => {
    const { tabPanes } = this.props;
    if (tabPanes == null) {
      return [];
    }
    return tabPanes.map(x => { return { tabId: x, title: this.getTabPaneTitle(x),iconId:x } })
  }

  getTabPaneTitle = tabPane => {
    switch (tabPane) {
      case tabPaneIds.LIST_VIEW_PANE:
        return '列表视图';
      case tabPaneIds.SETTING_PANE:
        return '设置';
      default:
        return '未知';
    }
  }



  isTabPaneVisible=name=>{
    const { tabPanes ,activeTabPane} = this.props;
    if(tabPanes==null){
      return false;
    }
    return tabPanes.some(x=>x===name) && activeTabPane===name;
  }

  render() {
    console.log('render tabpanelist');
    const { activeTabPane } = this.props;
    return <Container>
      <TabPanes items={this.getTabPanes()} onClose={this.handleCloseTab} selectedTabId={activeTabPane} onSelect={this.handleSelectTab}/>
      <TabPanel>     
          {this.isTabPaneVisible(tabPaneIds.LIST_VIEW_PANE) && <ListViewTabPane/> }     
          {this.isTabPaneVisible(tabPaneIds.SETTING_PANE) && <SettingTabPane/> }    
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

