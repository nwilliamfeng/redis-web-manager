import React, { Component } from 'react'
import styled from 'styled-components'
import Popup from "reactjs-popup"

const MenubarDiv = styled.div`
    display:flex;

`

const MenuItemDiv = styled.div`
    padding:6px 12px;
    background:${props => props.isDropdown === true ? '#eee' : 'white'};
    border:${props => props.isDropdown === true ? '1px solid lightgray' : '1px solid transparent'};
    border-bottom:none;
    cursor:default;
    &:hover{
        background:#eee;
    }
`


const popupContentStyle = () => {
    return {
        padding: "0px",
        border: "1px solid lightgray",
        width: 150,
        backgroundColor: 'white',
         
    }
}


const MenuItem = props => {
    const { title, subItems } = props;
    return <Popup
        trigger={open => <MenuItemDiv isDropdown={open} >{title}</MenuItemDiv>}
        position={'bottom left'}
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={popupContentStyle(0, 0)}
        arrow={false} >
        {subItems && subItems.map(x => <MenuItem {...x}   key={x.id}/>)}
    </Popup>

}


export class Menu extends Component {
    render() {
        const { items } = this.props;
        return <MenubarDiv>
            {items && items.map(x => <MenuItem key={x.id} {...x} />)}
        </MenubarDiv>
    }
}

const MenuItemValue = {
    title: '',
    id: 'abc',
    command: null,
    subitems: [],
}

