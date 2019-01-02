import React from 'react'
import { ContextMenuTrigger } from "react-contextmenu"

const collect = (props) => {
    return props;
}


export const withContextMenuTrigger =triggerId => props => {
    return <ContextMenuTrigger id={triggerId} collect={collect} {...props}/>
 }
 
 