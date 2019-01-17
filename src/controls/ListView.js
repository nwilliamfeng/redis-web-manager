import React, { Component } from 'react'
import styled from 'styled-components'
import { CheckBox } from './CheckBox'
import { ContextMenuTrigger } from "react-contextmenu"
import { IconList } from './IconList'
import { isEqual } from 'lodash'
import { ContextMenuTriggerRegists } from './ContextMenuTriggerRegists'
import { ConnectionMenuTrigger, ConnectionContextMenu } from '../components/contextMenus'

const ItemBase = styled.div`
    &:hover{
        background:${props => props.isSelected === true ? '#CCE8FF' : 'aliceblue'};
    }
    &:hover .checkBox{
       visibility: visible;
    }
    background:${props => props.isSelected === true ? '#CCE8FF' : 'transparent'};
`

const Div = styled.div`
    outline:none;
    display:flex;
    width:100%;
    height:100%;
    padding:5px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content:flex-start ;
`

const LargeCheckBox = styled(CheckBox)`
    margin-left:-20px;
    margin-right:10px;
`

const LargeWordDiv = styled.div`
    max-width:64px;   
    overflow:hidden;  
    word-wrap:break-word;
    text-align:left;
    font-size:13px;
`

const LargeItemDiv = styled(ItemBase)`
    display:flex;
    flex-direction:column;
    max-height:85px;
    min-width:80px;
    max-width:80px;
    align-items:center;
    justify-items:center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    padding:3px 8px 8px 8px;
`

const LargeIconDiv = styled.div`
    height:32px;
    width:32px;
    margin-bottom:2px;   
`
const LargeIcon = ({ iconId }) => {
    const Img = IconList.find(x => x.key === iconId).icon;
    return <LargeIconDiv>
        <Img width={32} height={32} />
    </LargeIconDiv>
}

const LargeContainer = styled.div`
   display:flex;
   justify-content:flex-start;
`

const SmallItemDiv = styled(ItemBase)`
    display:flex;
    max-width:270px;
    width:270px;
    max-height:24px;
    padding-left:5px;
    padding-right:5px;
    align-items:center;
    height:24px; 
`

const SmallIconDiv = styled.div`
     margin:0px 5px;  
     height:16px;
     width:16px;
`

const CheckBoxDiv = styled.div`
    visibility:${props => props.isVisible === true ? 'visible' : 'hidden'};
`

const SmallIcon = ({ iconId }) => {
    const Img = IconList.find(x => x.key === iconId).icon;
    return <SmallIconDiv>
        <Img />
    </SmallIconDiv>
}

const SmallWordDiv = styled.div`
    max-width:240px;   
    overflow:hidden;  
    font-size:13px;
    text-align:left;
    white-space:nowrap;
    text-overflow:ellipsis;
`



const Trigger = (props) => {
    const { contextMenuProps } = props;
    if (contextMenuProps == null) {
        return <div >{props.children}</div>
    }
    const regist = ContextMenuTriggerRegists.find(x => x.key === contextMenuProps.contextMenuTriggerId);
    if (regist == null) {
        return <div >{props.children}</div>
    }
    const ItemTrigger = regist.trigger;

    return <ItemTrigger  {...contextMenuProps}>
        {props.children}
    </ItemTrigger>

}


const ListViewItem = props => {
    const { id, iconId, title, onClick, onDoubleClick, isSelected = false, isSmallIcon = false } = props
    const handleClick = e => {
        if (onClick != null) {
            onClick(id);
        }
    }

    const handleCheck = () => {
        if (onClick != null) {
            onClick(id, !isSelected);
        }
    }
    const handleDoubleClick = e => {
        e.stopPropagation();
        if (onDoubleClick != null) {
            onDoubleClick(id);
        }
    }

    return <React.Fragment>
        <Trigger {...props} >
            {isSmallIcon === false &&
                <LargeItemDiv isSelected={isSelected} title={title} onClick={handleClick} onDoubleClick={handleDoubleClick} >
                    <LargeContainer>
                        <CheckBoxDiv className='checkBox' isVisible={isSelected} >
                            <LargeCheckBox type='checkbox' isChecked={isSelected} handleCheck={handleCheck} />
                        </CheckBoxDiv>
                        <LargeIcon iconId={iconId} />
                    </LargeContainer>
                    <LargeWordDiv>{title}</LargeWordDiv>
                </LargeItemDiv>}
            {isSmallIcon === true &&
                <SmallItemDiv isSelected={isSelected} title={title} onClick={handleClick} onDoubleClick={handleDoubleClick} >
                    <CheckBoxDiv className='checkBox' isVisible={isSelected === true} >
                        <CheckBox type='checkbox' isChecked={isSelected} handleCheck={handleCheck} />
                    </CheckBoxDiv>
                    <SmallIcon iconId={iconId} />
                    <SmallWordDiv>{title}</SmallWordDiv>
                </SmallItemDiv>
            }
        </Trigger>
    </React.Fragment>


}

export class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedItemIds: [] };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!isEqual(this.props, nextProps)) {
            this.setState({ selectedItemIds: [] });
            this.notifyItemsSelect([]);
        }

    }

    notifyItemsSelect = ids => {
        const { onSelectItemsChange } = this.props;
        if (onSelectItemsChange != null) {
            onSelectItemsChange(ids);
        }
    }

    handleItemClick = (id, isSelected) => {
        if (isSelected == null) {
            this.setState({ selectedItemIds: [id] });
            this.notifyItemsSelect([id]);
            return;
        }
        const { selectedItemIds } = this.state;
        const idx = selectedItemIds.findIndex(x => x === id);
        if (idx >= 0) {
            if (isSelected === false) {
                const sids = [...selectedItemIds.slice(0, idx), ...selectedItemIds.slice(idx + 1)];
                this.setState({ selectedItemIds: sids });
                this.notifyItemsSelect(sids);
            }
        }
        else if (isSelected === true) {
            const sids = [...selectedItemIds, id];
            this.setState({ selectedItemIds: sids });
            this.notifyItemsSelect(sids);
        }

    }

    getNextItemIdx = id => {
        const { items } = this.props;
        const idx = items.findIndex(x => x.id === id);
        return idx === items.length - 1 ? 0 : idx + 1;
    }

    getPreviousItemIdx = id => {
        const { items } = this.props;
        const idx = items.findIndex(x => x.id === id);
        return idx === 0 ? items.length - 1 : idx - 1;
    }

    handleKeyDown = e => {

        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const { items, } = this.props;
            if (items.length === 0) {
                return;
            }
            const { selectedItemIds } = this.state;
            switch (e.key) {
                case 'ArrowRight':
                    const idx = selectedItemIds.length === 0 ? 0 : this.getNextItemIdx(selectedItemIds[selectedItemIds.length - 1]);
                    if (e.shiftKey === true) {
                        this.setState({ selectedItemIds: [...selectedItemIds, items[idx].id] });
                    }
                    else {
                        this.setState({ selectedItemIds: [items[idx].id] });
                    }
                    break;
                case 'ArrowLeft':
                    const idx2 = selectedItemIds.length === 0 ? 0 : this.getPreviousItemIdx(selectedItemIds[0]);
                    if (e.shiftKey === true) {
                        this.setState({ selectedItemIds: [items[idx2].id,...selectedItemIds] });
                    }
                    else {
                        this.setState({ selectedItemIds: [items[idx2].id] });
                    }
                    break;
                default:
                    break;
            }
        }



    }

    render() {
        const { items } = this.props;
        const { selectedItemIds } = this.state;
        return <Div tabIndex={2} onKeyDown={this.handleKeyDown}>
            {items && items.map(x => <ListViewItem key={x.id} {...x} onClick={this.handleItemClick} isSelected={selectedItemIds.findIndex(id => id === x.id) >= 0} />)}
        </Div>
    }
}