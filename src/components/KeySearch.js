import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withSearchBox } from '../controls'
import { connectionActions } from '../actions'


const MenuItemDiv = styled.div`
 display:flex;
 flex-direction:row;
 background-color:${props => props.highlighted ? '#eee' : 'transparent'};
 padding:5px;`

const Avata=styled.img`
    max-width:24px;
    max-height:24px;
    margin-right:8px;`

const MenuItem = (item, highlighted) => <MenuItemDiv key={item.id} highlighted={highlighted}>
    <Avata src={item.avata}/>
    {item.label}
</MenuItemDiv>


const SearchBox = withSearchBox(null,MenuItem)


/** 
 * 搜索框组件 
 */
class KeySearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }
 

    getKeyTypes = () => {
        
            return []
      //  return relationMappingList.map(x => { return { id: x.CustomerId, label: x.CustomerName,avata:x.CustomerAvataUrl } })
    }

    handleSelectItem = item => {
        // console.log(item);
        // const { dispatch, relationMappingList } = this.props
        // if (relationMappingList == null)
        //     return       
        // const customer=relationMappingList.find(x=>x.CustomerId===item.id) 
        // dispatch(chatActions.chatWithMyCustomer(customer))
    }


    render() {
        return <SearchBox getMenuItems={this.getKeyTypes} onSelectItem={this.handleSelectItem} />
    }

}

function mapStateToProps(state) {
    return state;
}

const page = connect(mapStateToProps, null)(KeySearch);

/**
 * SearchBox实例
 */
export { page as KeySearch }; 
