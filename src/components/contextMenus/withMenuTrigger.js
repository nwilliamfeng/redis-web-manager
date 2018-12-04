import React from 'react'
import { commandConstants, contextMenuIds } from '../../constants'
import { dbActions } from '../../actions'
import { ContextMenuTrigger } from "react-contextmenu"

const collect = (props) => {
    return props;
}


// export const withContextMenuTrigger = ({ id, getAttributes, getHandleItemClick }) => props => {
//    return <ContextMenuTrigger id={id}
//         attributes={getAttributes(props)}
   
//         onItemClick={getHandleItemClick(props)}
//         collect={collect} {...props}>

//     </ContextMenuTrigger>
// }



export const withContextMenuTrigger = ({ id, attributes, handleItemClick }) => props => {
    return <ContextMenuTrigger id={id}
         attributes={attributes}
    
         onItemClick={handleItemClick}
         collect={collect} {...props}>
 
     </ContextMenuTrigger>
 }
 
 