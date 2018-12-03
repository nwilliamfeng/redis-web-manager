import React, { Component } from 'react'
import styled from 'styled-components'
import { CheckBox } from './CheckBox'
import { ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from '../constants'
import {ListViewIcons} from './ListViewIcons'

const Div = styled.div`
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
`

const LargeItemDiv = styled.div`
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
    &:hover{
        background:${props => props.isSelected === true ? '#CCE8FF' : 'aliceblue'};
    }
    background:${props => props.isSelected === true ? '#CCE8FF' : 'transparent'};
`

const LargeIconDiv=styled.div`
    height:32px;
    width:32px;
    margin-bottom:2px;   
`
const LargeIcon =({iconId}) => {
    const Img= ListViewIcons.find(x=>x.key===iconId).icon;
    return <LargeIconDiv>
        <Img width={32} height={32}/>
    </LargeIconDiv>
}

const LargeContainer = styled.div`
   display:flex;
   justify-content:flex-start;
   &:hover .something{
       color:red;
   }
`

const SmallItemDiv = styled.div`
    display:flex;
    max-width:270px;
    width:270px;
    max-height:24px;
    padding-left:5px;
    padding-right:5px;
    align-items:center;
    height:24px;
    &:hover{
        background:${props => props.isSelected === true ? '#CCE8FF' : 'aliceblue'};
    }
    background:${props => props.isSelected === true ? '#CCE8FF' : 'transparent'};
`
const MockCheckBox = styled.div`
    height: 16px;
    width:16px;
`
 

const SmallIconDiv=styled.div`
     margin:0px 5px;  
     height:16px;
     width:16px;
`

const SmallIcon =({iconId}) => {
    const Img= ListViewIcons.find(x=>x.key===iconId).icon;
    return <SmallIconDiv>
        <Img/>
    </SmallIconDiv>
}

const SmallWordDiv = styled.div`
    max-width:240px;   
    overflow:hidden;  
    text-align:left;
    white-space:nowrap;
    text-overflow:ellipsis;
`

//const ditems = [{ iconId: 'CONNECTION_SUCCESS_ICON', title: 'ab56346345634563456345643563462', id: 'abcd' }]

const ListViewItem = ({ id, iconId, title, onClick,onDoubleClick, isSelected = false, isSmallIcon = false }) => {
    const handleClick = () => {
        if (onClick != null) {
            onClick(id);
        }
    }
    const handleDoubleClick =()=>{
        if(onDoubleClick!=null){
            onDoubleClick(id);
        }
    }
    return <React.Fragment>
        {isSmallIcon === false &&
            <LargeItemDiv onClick={handleClick} onDoubleClick={handleDoubleClick} isSelected={isSelected} title={title}>
                <LargeContainer>
                    {/* <LargeCheckBox type='checkbox' isVisible={isSelected}/> */}
                    <div className="something">{'a'}</div>
                    <LargeIcon iconId={iconId}/>
                </LargeContainer>
                <LargeWordDiv>{title}</LargeWordDiv>
            </LargeItemDiv>}
        {isSmallIcon === true &&
            <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ connection: JSON.stringify('item') }}>
                <SmallItemDiv  onClick={handleClick} onDoubleClick={handleDoubleClick} isSelected={isSelected} title={title}>

                    {isSelected === true && <CheckBox type='checkbox' />}
                    {(!isSelected || isSelected === false) && <MockCheckBox />}
                    <SmallIcon iconId={iconId}/>
                    <SmallWordDiv>{title}</SmallWordDiv>
                </SmallItemDiv>
            </ContextMenuTrigger>
        }
    </React.Fragment>
}

export class ListView extends Component {

    constructor(props){
        super(props);
        this.state={selectedItemId:null};
         
    }

    // componentWillReceiveProps(nextProps,nextContext){
    //     if(nextProps!=null){
    //         this.setState
    //     }
    // }

    handleItemClick=x=>{
        this.setState({selectedItemId:x})
    }

    render() {
        const {items}= this.props;
        const {selectedItemId} =this.state;
        return <Div>
            {items && items.map(x => <ListViewItem key={x.id} {...x}  onClick={this.handleItemClick} isSelected={selectedItemId===x.id}/>)}
        </Div>
    }
}