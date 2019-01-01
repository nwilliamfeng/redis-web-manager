import {menuIds} from './menuIds'
import {spliter} from './spliter'
import {commandAction} from '../../actions'
import {addKeyCommand} from '../commands'

const refresh={
    isTopMenu:false,
    title:'刷新',
    id: menuIds.REFRESH_MENU,
    command:props=>{
        console.log(props);
        console.log('do refresh ');
       
    },
}

const newConnection ={
    isTopMenu:false,
    title:'新建连接',
    id: menuIds.NEW_CONNECTION,
    
    command:()=>{
        console.log('do new connection');
    },
}



const newKey ={
    isTopMenu:false,
    title:'新建键',
    id: menuIds.NEW_KEY,
    disableHandle:props=>{
        return !addKeyCommand(props).canExecute();
    },
    command:props=>{
        addKeyCommand(props).execute();
    },
}


export const fileMenu={
    isTopMenu:true,
    title:'文件(F)',
    id: menuIds.FILE_MENU,
    subItems:[newConnection,newKey,spliter,refresh,],
}

  