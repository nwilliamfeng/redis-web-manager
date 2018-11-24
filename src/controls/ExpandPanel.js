import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight as arrowRight, faChevronDown as arrowDown } from '@fortawesome/free-solid-svg-icons'


const Div = styled.div`
    padding:3px 5px 1px 5px;
    width:100%;
    height:28px;
    padding-left:${props=>props.isChild? '10px':'5px'};
    &:hover{
        color: orangered;
        background-color:#DEDBDA;
    }`

const HeaderSpan =styled.span`    
    cursor:default; `


const Arrow = styled.span`  
    margin-right:${props=>props.isExpand? '7px':'10px'};`

const Count =styled.span`
    border-radius:32px;
    margin-left:10px;
    margin-right:10px;
    padding:1px 4px;
    background:gray;
    color:white;
    font-size:10px;
    vertical-align:middle;
    cursor:pointer;`

/**
 * 可折叠面板
 * @param {*} param0 
 */
export class ExpandPanel extends Component {
    constructor(props) {
        super(props);
        const {isExpand,panelId}=props;
        this.state = {
            isExpand,//是否展开状态
            panelId,
        }
    }

    handleDoubleClick = () => {
        const {panelId, isExpand} =this.state;
        const nwValue=!isExpand;
        this.setState({isExpand:nwValue});
        const {expandHandle} =this.props;
        if(expandHandle!=null){
            expandHandle(panelId, nwValue);
        }
    }


    render() {
        const { isExpand } = this.state;
        const { children, title,count,isChild } = this.props;
        return (
            <div>
                <Div onDoubleClick={this.handleDoubleClick} isChild={isChild}>
                    <Arrow onClick={this.handleDoubleClick} isExpand={isExpand}>
                        <FontAwesomeIcon icon={isExpand === true ? arrowDown : arrowRight} size='xs' />
                    </Arrow>
                    <HeaderSpan>{title}</HeaderSpan>
                    {count && <Count>{count}</Count>}
                </Div>
                {isExpand===true && children}
            </div>
        )
    }
}