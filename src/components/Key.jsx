import React from 'react'
import styled from 'styled-components'
import { withSelectByClick } from '../controls'
import { KeyMenuTrigger } from './contextMenus'
import { NameDiv, FlexDiv, FlexContainerDiv, HoverDiv } from '../controls/parts'
import {KeyIcon} from './icons'

const Content = props => {
    const { keyName } = props;
    
    return <FlexDiv >
        <FlexContainerDiv>
            <KeyIcon/>
            <NameDiv>{keyName}</NameDiv>
        </FlexContainerDiv>
    </FlexDiv>
}

const Div = styled.div`margin-left:-20px;`

const SelectContent =styled( withSelectByClick(props => <Content {...props} />))`padding-left:50px;`

export const Key = ({id, keyName, keyType, isSelected, handleClick,dispatch,dbIdx,connectionName ,dbId}) => {
    const click = () => {
        handleClick(id);
    }
    return <Div title={`Key:${keyName}, Type:${keyType}`}  onClick={click}>
        <KeyMenuTrigger dispatch={dispatch} dbIdx={dbIdx} connection={connectionName} keyName={keyName} dbId={dbId} >
            <HoverDiv>
                <SelectContent isSelected={isSelected} handleClick={handleClick} keyName={keyName}    />
            </HoverDiv>
        </KeyMenuTrigger>
    </Div>
}