import {menuIds} from './menuIds'
import {spliter} from './spliter'
import {compositModifyCommand,compositDeleteCommand} from '../commands'

 
const deleteMenuItem ={
    isTopMenu:false,
    title:'删除',
    id: menuIds.DELETE_KEY,
    disableHandle:props=>{
        return !compositDeleteCommand(props).canExecute();
    },
    command:props=>{
        compositDeleteCommand(props).execute();
    },
}
 


const modifyMenuItem ={
    isTopMenu:false,
    title:'修改...',
    id: menuIds.MODIFY_KEY,
    disableHandle:props=>{
        return !compositModifyCommand(props).canExecute();
    },
    command:props=>{
        compositModifyCommand(props).execute();
    },
}


export const editMenu={
    isTopMenu:true,
    title:'编辑(E)',
    id: menuIds.EDIT_MENU,
    subItems:[modifyMenuItem,spliter,deleteMenuItem,],
}

  