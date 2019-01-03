import {menuIds} from './menuIds'
import {spliter} from './spliter'
import {commandHelper,addConnectionCommand,addKeyCommand,compositRefreshCommand,refreshConnectionsCommand,compositOpenCommand} from '../commands'
import {dbStates} from '../../constants'


const load={
    isTopMenu:false,
    title:'加载',
    id: menuIds.LOAD_MENU,
    disableHandle:props=>!compositOpenCommand(props).canExecute(),
    command:props=> compositOpenCommand(props).execute(),
}

const refresh={
    isTopMenu:false,
    title:'刷新',
    id: menuIds.REFRESH_MENU,
    disableHandle:props=>!compositRefreshCommand(props).canExecute(),
    command:props=> compositRefreshCommand(props).execute(),
}

const refreshConnections ={
    isTopMenu:false,
    title:'刷新所有连接',
    id: menuIds.REFRESH_ALL_CONNECTION_MENU,
    
    command:props=>{
        refreshConnectionsCommand({dispatch:props.dispatch});
    },
}

const newConnection ={
    isTopMenu:false,
    title:'新建连接',
    id: menuIds.NEW_CONNECTION,
    
    command:props=>{
       addConnectionCommand({dispatch:props.dispatch});
    },
}





const newKey ={
    isTopMenu:false,
    title:'新建键',
    id: menuIds.NEW_KEY,
    disableHandle:props=>{
        const {selectedDbId}=props;
        return selectedDbId==null || commandHelper.getSelectedDb(props).dbState !== dbStates.KEY_LOAD_SUCCESS ;
    },
    command:props=>{
        addKeyCommand(props);
    },
}


export const fileMenu={
    isTopMenu:true,
    title:'文件(F)',
    id: menuIds.FILE_MENU,
    subItems:[load, spliter(), newConnection,newKey,spliter(),refreshConnections,spliter(),refresh],
}

  