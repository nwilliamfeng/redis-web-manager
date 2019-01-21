import React from 'react'
import styled from 'styled-components'
import { KeyMenuTrigger } from './contextMenus'
import { NameDiv, FlexDiv, FlexContainerDiv, SelectableLi } from '../controls/parts'
import { KeyIcon } from './icons'

const Content = props => {
    const { keyName } = props;

    return <FlexDiv >
        <FlexContainerDiv>
            <KeyIcon />
            <NameDiv>{keyName}</NameDiv>
        </FlexContainerDiv>
    </FlexDiv>
}

const KeyLi = styled(SelectableLi)`
    padding-left:35px;
`

 
export const Key = ({ id, keyName, keyType, isSelected, handleClick, dispatch, dbIdx, connectionName, isVisible, dbId }) => {
    const redisKey = { id, key: keyName, type: keyType, dbIdx, dbId, connectionName }
    const click = () => {
        handleClick(id);
    }
    if (isVisible !== true) {
        return <React.Fragment />
    }
    return <KeyMenuTrigger dispatch={dispatch}
        redisKey={redisKey}
        dbIdx={dbIdx}
        connectionName={connectionName}
        keyName={keyName}
        dbId={dbId}
        keyType={keyType} >
        <KeyLi title={`Key:${keyName}, Type:${keyType}`} onClick={click} isSelected={isSelected}>
             <Content keyName={keyName}/>
        </KeyLi>
    </KeyMenuTrigger>
}