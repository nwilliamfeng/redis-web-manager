import styled from 'styled-components'


export const Div=styled.div`

    padding:${props=>props.padding?props.padding:'0px'};
    margin:${props=>props.margin?props.margin:'0px'};
    background:${props=>props.background?props.background:'transparent'};
    color:${props=>props.color?props.color:'black'};
    display:${props=>props.display?props.display:'inline'};
`