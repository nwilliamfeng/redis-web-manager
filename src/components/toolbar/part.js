import styled from 'styled-components'
import { Button } from '../../controls'

export const Seperator = styled.div`
    height:20px;
    width:1px;
    margin-right:10px;
    border-left:gray solid 1px;
`

export const ButtonDiv = styled.div`
    flex:0 1 100%;
    height:100%;
    margin-left:5px;
    align-items:center;
    justify-content:left;
    text-align:left;
    display:flex;
`



export const ToolbarButton = styled(Button)`
    height:${props => props.height ? props.height : '24px'};
    width:${props => props.width ? props.width : '24px'};
    background-image:${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
    background-repeat:no-repeat;
    margin-right:8px;
    background-size:100%;
 `

 