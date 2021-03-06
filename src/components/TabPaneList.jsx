import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { commandAction } from '../actions'
import { locator } from '../utils'
import { FolderIcon, SettingIcon, KeyIcon, ConnectionIcon } from './icons'
import { tabPaneIds } from '../constants'
import { TabPanes, withScroll, IconList } from '../controls'
import { ListViewTabPane, SettingTabPane, KeyViewTabPane, ConnectionViewTabPane } from './tabPanes'



const Container = styled.div`
  display: flex;
  width:100%;
  height:100%;
  flex-direction:column;
`

const TabPanel = withScroll(props => <div {...props} style={{ height: '100%' }} />)


class TabPaneList extends Component {

  constructor(props) {
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
    add({ key: tabPaneIds.KEY_SETTING_VIEW_PANE, icon: KeyIcon });
    add({ key: tabPaneIds.CONNECTION_VIEW_PANE, icon: ConnectionIcon });
  }


  handleSelectTab = tabId => {
    const { dispatch } = this.props;
    dispatch(commandAction.selectTabPane(tabId));
  }

  handleCloseTab = tabId => {
    const { dispatch } = this.props;
    dispatch(commandAction.closeTabPane(tabId));
  }

  getTabPanes = () => {
    const { tabPanes } = this.props;
    if (tabPanes == null) {
      return [];
    }
    return tabPanes.map(x => { return { tabId: x, title: this.getTabPaneTitle(x), iconId: x } })
  }

  getTabPaneTitle = tabPane => {

    switch (tabPane) {
      case tabPaneIds.LIST_VIEW_PANE:
        return '列表视图';
      case tabPaneIds.SETTING_PANE:
        return '设置';
      case tabPaneIds.KEY_SETTING_VIEW_PANE:
        return this.getKeyViewTitle();
      case tabPaneIds.CONNECTION_VIEW_PANE:
        return this.getConnectionViewTitle();
      default:
        return '未知';
    }
  }

  getKeyViewTitle = () => {
    const redisKey = locator.getSelectedKey(this.props);
    const { isKeyDirty } = this.props;
    return redisKey ? isKeyDirty === true ? '*' + redisKey.key : redisKey.key : '键';
  }

  getConnectionViewTitle = () => {
    const connection = locator.getSelectedConnection(this.props);
    
    return connection ? connection.name: 'Redis连接';
  }

  isTabPaneVisible = name => {
    const { tabPanes, activeTabPane } = this.props;
    if (tabPanes == null) {
      return false;
    }
    return tabPanes.some(x => x === name) && activeTabPane === name;
  }

  render() {
    const { activeTabPane } = this.props;
    return <Container>
      <TabPanes items={this.getTabPanes()} onClose={this.handleCloseTab} selectedTabId={activeTabPane} onSelect={this.handleSelectTab} />
      <TabPanel>
        {this.isTabPaneVisible(tabPaneIds.LIST_VIEW_PANE) && <ListViewTabPane />}
        {this.isTabPaneVisible(tabPaneIds.SETTING_PANE) && <SettingTabPane />}
        <KeyViewTabPane visible={this.isTabPaneVisible(tabPaneIds.KEY_SETTING_VIEW_PANE) && activeTabPane === tabPaneIds.KEY_SETTING_VIEW_PANE} />
        <ConnectionViewTabPane visible={this.isTabPaneVisible(tabPaneIds.CONNECTION_VIEW_PANE) && activeTabPane === tabPaneIds.CONNECTION_VIEW_PANE} />

      </TabPanel>

    </Container>

  }
}

const mapStateToProps = state => {
  const { tabPanes, activeTabPane, selectedNodeType } = state.state;

  return { tabPanes, activeTabPane, selectedNodeType, ...state.key, ...state.connection };
}

const list = connect(mapStateToProps)(TabPaneList)

export { list as TabPaneList }

