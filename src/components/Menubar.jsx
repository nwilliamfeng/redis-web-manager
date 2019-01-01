import React, { Component } from 'react'
import { Menu } from '../controls/Menu'
import { fileMenu, viewMenu ,toolMenu} from './menus'
import { connect } from 'react-redux'


class Menubar extends Component {

    shouldComponentUpdate(nextProps,nextState,nextContext){
           
        return true;
    }

    render() {
        
        console.log('render menubar');
        const menuItems = [fileMenu, viewMenu,toolMenu];
        const {dispatch} =this.props;
        return <Menu items={menuItems} dispatch={dispatch} {...this.props} />
      
    }
}

const mapStateToProps = state => {
   return {...state.connection,...state.state,...state.key,...state.db}
}

const menubar = connect(mapStateToProps)(Menubar)

export { menubar as Menubar }
