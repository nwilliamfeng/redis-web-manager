import React from 'react'
import { entityState, keyType } from '../../constants'
import { TableContainer, Td, Tr, Table } from './part'

const convertEntityState = state => {
    switch (state) {
        case entityState.MODIFIED:
            return '已修改';
        case entityState.NONE:
            return '';
        case entityState.DELETED:
            return '已删除';
        case entityState.NEW:
            return '新建';
        default:
            return '';
    }
}

const KeyRow = ({ sKey, idx, onClick, selectedKey }) => {
    const { key, displayKey, value, state, type } = sKey;
    const handleClick = () => onClick(key);
    return <Tr onClick={handleClick} isSelected={selectedKey === key}>
        <Td width={'60px'}>{idx + 1}</Td>
        {type === keyType.HASH && <Td width={'150px'} maxWidth={'150px'}>{displayKey}</Td>}
        <Td width={'60%'} maxWidth={'60%'} >{value}</Td>
        {type === keyType.ZSET && <Td width={'150px'} maxWidth={'150px'}>{displayKey}</Td>}
        <Td width={'50px'}>{convertEntityState(state)}</Td>
    </Tr>
}


 


export const KeyTable = ({ keys, selectedKey, onRowClick }) => {
    if (keys.length === 0) {
        return <React.Fragment />
    }
    const { type } = keys[0];
    return <TableContainer className='scollContainer' >
        <Table>
            <thead>
                <tr>
                    <th>序号</th>
                    {type === keyType.HASH && <th>Key</th>}
                    <th>Value</th>
                    {type === keyType.ZSET && <th>Score</th>}
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                {keys.filter(x => x.state !== entityState.DELETED).map((x, idx) => <KeyRow key={idx} sKey={x} idx={idx} onClick={onRowClick} selectedKey={selectedKey} />)}
            </tbody>
        </Table>
    </TableContainer>
}




