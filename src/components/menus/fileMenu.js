import {menuIds} from './menuIds'
import {spliter} from './spliter'
import {commandAction} from '../../actions'

const refresh={
    isTopMenu:false,
    title:'刷新',
    id: menuIds.REFRESH_MENU,
    command:dispatch=>{
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
    command:()=>{
        console.log('do new key');
    },
}


export const fileMenu={
    isTopMenu:true,
    title:'文件',
    id: menuIds.FILE_MENU,
    subItems:[newConnection,newKey,spliter,refresh,],
}

  