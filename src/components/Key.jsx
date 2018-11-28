import React from 'react'
import styled from 'styled-components'
import { withSelectByClick } from '../controls'
import { ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { NameDiv, FlexDiv, LiIcon, FlexContainerDiv, HoverDiv } from '../controls/parts'
import {icons} from './icons'

const Content = props => {
    const { keyName } = props;
    
    return <FlexDiv >
        <FlexContainerDiv>
            <LiIcon src={icons.KEY_ICON} />
            <NameDiv>{keyName}</NameDiv>
        </FlexContainerDiv>
    </FlexDiv>
}

const Div = styled.div`margin-left:-20px;`

const SelectContent =styled( withSelectByClick(props => <Content {...props} />))`padding-left:50px;`

export const Key = ({ keyName, keyType, isSelected, handleClick }) => {
    const click = () => {
        handleClick(keyName);
    }
    return <Div title={`Key:${keyName}, Type:${keyType}`}  onClick={click}>
        <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
            <HoverDiv>
                <SelectContent isSelected={isSelected} handleClick={handleClick} keyName={keyName}   />
            </HoverDiv>
        </ContextMenuTrigger>
    </Div>
}