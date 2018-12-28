import styled from 'styled-components'

export const Button = styled.button`
    outline:none;
    border:none;
    background-color:transparent;
    opacity:0.8;
    &:hover{
        opacity:1;
    }
    &:active{
        opacity:0.8;
    }
    &:disabled{
        opacity:0.3;
    }
`