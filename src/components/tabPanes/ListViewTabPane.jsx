import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ListView } from '../../controls'

const Div = styled.div`
    width:100%;
    height:100%;
    padding:1px;
    padding-bottom:2px;
`



class ListViewTabPane extends Component {
    render() {
        console.log('render listviewpane');
        console.log(this.props);
        return <Div>

            <ListView />

        </Div>
    }
}


const mapStateToProps = state => {
    return { ...state.state };
}

const listView = connect(mapStateToProps)(ListViewTabPane)

export { listView as ListViewTabPane }