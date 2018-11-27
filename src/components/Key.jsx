import React from 'react'
import styled from 'styled-components'
import { withSelectByClick } from '../controls'
import { ContextMenuTrigger } from "react-contextmenu"
import { contextMenuIds } from './contextMenuIds'
import { Li, NameDiv, FlexDiv, LiIcon, FlexContainerDiv, HoverDiv } from '../controls/parts'

const Content = props => {
    const { keyName, handleClick } = props;
    const click = () => {
        handleClick(keyName);
    }
    return <FlexDiv >
        <FlexContainerDiv onClick={click}>
            <LiIcon src={require('../assets/imgs/key.png')} />
            <NameDiv>{keyName}</NameDiv>
        </FlexContainerDiv>
    </FlexDiv>
}

const Div = styled.div`margin-left:-20px;`

const SelectContent =styled( withSelectByClick(props => <Content {...props} />))`padding-left:50px;`

export const Key = ({ keyName, keyType, isSelected, handleClick }) => {
    return <Div title={`Key:${keyName}, Type:${keyType}`}>
        <ContextMenuTrigger id={contextMenuIds.CONNECTION_CONTEXTMENU_ID} attributes={{ chatdata: JSON.stringify('chat') }}>
            <HoverDiv>
                <SelectContent isSelected={isSelected} handleClick={handleClick} keyName={keyName}   />
            </HoverDiv>
        </ContextMenuTrigger>
    </Div>
}