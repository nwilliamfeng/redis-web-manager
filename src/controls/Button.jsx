import styled from 'styled-components'

export const Button = styled.button`
    outline:none;
    border:none;
    background-color:transparent;
    opacity:1;
    &:hover{
        opacity:0.8;
    }
    &:active{
        opacity:0.6;
    }
    &:disabled{
        opacity:0.3;
    }
`