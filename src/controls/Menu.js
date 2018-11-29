import React, { Component } from 'react'
import styled from 'styled-components'
import Popup from "reactjs-popup"

const MenubarDiv = styled.div`
    display:flex;

`

const MenuItemDiv = styled.div`
    padding:6px 12px;
    background:${props => props.isOpen === true ? '#eee' : 'white'};
    border:${props => props.isTopMenu === true && props.isOpen === true ? '1px solid lightgray' : '1px solid transparent'};
    border-bottom:none;
    max-width:${props => props.isTopMenu === true ? '120px' : 'none'};
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    cursor:default;
    &:hover{
        background:#eee;
    }
`


const popupContentStyle = () => {
    return {
        padding: "0px",
        border: "1px solid lightgray",
        minWidth: 150,
        backgroundColor: 'white',

    }
}


class MenuItem extends Component {

    handleClick=()=>{
        const {command,popup}=this.props;
       
        if(command!=null){
            console.log('close '+this.props.title);
           // command();
            popup.closePopup();
        }
    }

    render() {
        
        const { title, subItems, isTopMenu } = this.props;
        return <React.Fragment>
           {subItems && <Popup
                trigger={open => <MenuItemDiv isOpen={open} isTopMenu={isTopMenu}>{title}</MenuItemDiv>}
                position={'bottom left'}
                closeOnDocumentClick
                mouseLeaveDelay={300}
                on='hover'
                ref={el => this.popup = el}
                mouseEnterDelay={0}
                contentStyle={popupContentStyle(0, 0)}
                arrow={false} >
                {subItems && subItems.map(x => <MenuItem {...x} key={x.id} popup={this.popup}/>)}
            </Popup>}
            {!subItems && <MenuItemDiv onClick={this.handleClick}  isTopMenu={isTopMenu}>{title}</MenuItemDiv> }
        </React.Fragment>

    }
}


export class Menu extends Component {
   

    render() {
        console.log('render menu');
        const { items } = this.props;
        return <MenubarDiv>
            {items && items.map(x => <MenuItem key={x.id} {...x}/>)}
        </MenubarDiv>
    }
}

// const MenuItemValue = {
//     title: '',
//     id: 'abc',
//     command: null,
//     subitems: [],
// }

