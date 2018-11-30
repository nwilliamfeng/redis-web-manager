import React,{Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

class ListViewTabPane extends Component{
    render(){
        console.log('render listviewpane');
        console.log(this.props);
        return <div> {'this is list view'}</div>
    }
}


const mapStateToProps =state=>{
    return {...state.state};
}

const listView = connect(mapStateToProps)(ListViewTabPane)

export {listView as ListViewTabPane}