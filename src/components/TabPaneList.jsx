import React ,{Component} from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

 

class TabPaneList extends Component{

    render(){
    
        return <Tabs forceRenderTabPanel >
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>
    
        <TabPanel>
          <div >
          <h2 >Any content 1</h2>
            </div>
         
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    }
}

const mapStateToProps=state=>{
    return {...state};
}

const list =connect(mapStateToProps)(TabPaneList)

export {list as TabPaneList}

